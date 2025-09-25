import React from "react";

const BlogCard = ({ post, featured }) => {
  return (
    <div className={`p-6 border rounded-lg shadow ${featured ? "col-span-2" : ""}`}>
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      <button className="text-blue-600 hover:underline">Read More</button>
    </div>
  );
};

export default BlogCard;
