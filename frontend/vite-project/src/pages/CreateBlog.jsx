
import React, { useState } from "react";
import "../assets/CreateBlog.css";
const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [image, setImage] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSaveDraft = () => {
    alert("Draft Saved! Connect to backend to enable persistent storage.");
  };

  // const handlePublish = async () => {
  //   // Send blog post to backend
  //   try {
  //     const res = await fetch("http://localhost:5000/api/blogs", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ title, excerpt, content, tags })
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       alert("Blog published!");
  //       setTitle("");
  //       setExcerpt("");
  //       setContent("");
  //       setTags([]);
  //       setImage(null);
  //       window.location.href = "/stories";
  //     } else {
  //       alert(data.message || "Failed to publish blog.");
  //     }
  //   } catch (err) {
  //     alert("Error connecting to server.");
  //   }
  // };

  const handlePublish = async () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser || !storedUser._id) {
    alert("Please login to publish a blog.");
    return;
  }

  // Prepare blog data with logged-in user's ID
  const blogData = {
    title,
    excerpt,
    content,
    tags,
    image: image ? URL.createObjectURL(image) : null, // or handle file upload separately
    userId: storedUser._id,
    author: storedUser._id, // <-- important
  };

  try {
    const res = await fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Blog published!");
      setTitle("");
      setExcerpt("");
      setContent("");
      setTags([]);
      setImage(null);
      window.location.href = "/stories";
    } else {
      alert(data.message || "Failed to publish blog.");
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to server.");
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    // Save blog post to localStorage
    const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    blogs.push({ title, excerpt, content, tags });
    localStorage.setItem("blogs", JSON.stringify(blogs));
    alert("Blog post created!");
    setTitle("");
    setExcerpt("");
    setContent("");
    setTags([]);
    setImage(null);
  };

  return (
    <div className="create-blog-page min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Write New Article</h2>
        <p className="text-muted-foreground text-center mb-8">
          Share your thoughts and expertise with the community
        </p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-lg">Article Details</span>
                <div className="flex gap-2">
                  <button type="button" className={`btn-outline px-4 py-1 ${!isPreview ? 'font-bold' : ''}`} onClick={() => setIsPreview(false)}>Edit</button>
                  <button type="button" className={`btn-primary px-4 py-1 ${isPreview ? 'font-bold' : ''}`} onClick={() => setIsPreview(true)}>Preview</button>
                </div>
              </div>
              {!isPreview ? (
                <>
                  <div className="mb-4" id="title">
                    <label className="block font-semibold mb-2">Title</label>
                    <input type="text" className="w-full border px-3 py-2 rounded" value={title} onChange={e => setTitle(e.target.value)} required />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Excerpt</label>
                    <textarea className="w-full border px-3 py-2 rounded h-24" value={excerpt} onChange={e => setExcerpt(e.target.value)} required />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Content</label>
                    <textarea className="w-full border px-3 py-2 rounded min-h-96" value={content} onChange={e => setContent(e.target.value)} required />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Featured Image</label>
                    <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
                  </div>
                </>
              ) : (
                <div className="prose max-w-none">
                  <h1>{title || "Your Article Title"}</h1>
                  <p className="text-lg text-muted-foreground">
                    {excerpt || "Your article excerpt will appear here..."}
                  </p>
                  <div className="whitespace-pre-wrap">
                    {content || "Your article content will appear here..."}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <span className="font-bold text-lg mb-2 block">Publish Settings</span>
              <div className="flex gap-2 mb-2">
                <button type="button" className="btn-outline flex-1" onClick={handleSaveDraft}>Save Draft</button>
                <button type="button" className="btn-primary flex-1" onClick={handlePublish}>Publish</button>
              </div>
              <div className="text-xs text-muted-foreground">Connect to backend to save and publish articles</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <span className="font-bold text-lg mb-2 block">Tags</span>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Add a tag..."
                  value={currentTag}
                  onChange={e => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border px-3 py-2 rounded"
                />
                <button type="button" className="btn-primary px-4" onClick={addTag}>Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="badge bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-red-500 hover:text-red-700 rounded-full p-0.5">×</button>
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <span className="font-bold text-lg mb-2 block">Writing Tips</span>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li> Use clear, concise headlines</li>
                <li> Break up text with subheadings</li>
                <li> Add relevant tags to reach your audience</li>
                <li> Include a compelling excerpt</li>
                <li> Use images to enhance your content</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
