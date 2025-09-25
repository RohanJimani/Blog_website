import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import "../assets/CreateBlog.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [image, setImage] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || "");
        setExcerpt(data.excerpt || "");
        setContent(data.content || "");
        setTags(data.tags || []);
        setImage(data.image || null);
      });
  }, [id]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, excerpt, content, tags, image })
      });
      if (res.ok) {
        alert("Blog updated!");
        navigate(`/blog/${id}`);
      } else {
        alert("Failed to update blog.");
      }
    } catch (err) {
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="create-blog-page min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Edit Article</h2>
        <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
              <span className="font-bold text-lg mb-2 block">Update Settings</span>
              <div className="flex gap-2 mb-2">
                <button type="submit" className="btn-primary flex-1">Update</button>
                <button type="button" className="btn-outline flex-1" onClick={() => navigate(`/blog/${id}`)}>Cancel</button>
              </div>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
