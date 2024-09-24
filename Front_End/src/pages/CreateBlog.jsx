import React, { useContext, useState } from "react";
import {BlogContext} from '../Context/UserContext.jsx'
function CreateBlog() {

  const {Blogs,setBlogs} = useContext(BlogContext);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const handleAddBlog = (e) => {
    e.preventDefault();

    const newBlog = {
      time: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
      }), 
      title: newTitle,
      body: newBody,
      id: Date.now(),
    };
    
    setBlogs([...Blogs, newBlog]);
    setNewTitle("");
    setNewBody("");
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-blue-50 p-4">
      <form
        onSubmit={handleAddBlog}
        className="w-full max-w-lg bg-blue-100 p-8 rounded-lg shadow-lg border border-blue-200"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Create a New Blog
        </h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-blue-700 font-semibold">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Write Title"
            className="w-full mt-2 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="blog" className="block text-blue-700 font-semibold">
            Blog
          </label>
          <textarea
            id="blog"
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            placeholder="Write your blog"
            className="w-full mt-2 p-3 h-32 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
