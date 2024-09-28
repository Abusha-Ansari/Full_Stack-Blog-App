import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../Context/UserContext.jsx";

function AllBlog() {
  const { Blogs, setBlogs } = useContext(BlogContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:1234/blogdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json(); 
        setBlogs(data); 
  
      } catch (error) {
        console.log('fail')
        window.alert(`Fetching blogs failed: ${error.message}`);
      }
    };

    fetchBlogs(); 
  }, []);


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:1234/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const newBlogs = Blogs.filter((currItem) => currItem._id !== id);
        setBlogs(newBlogs);
      } else {
        console.error("Failed to delete blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Function to handle editing a blog
  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  return (
    <>
      {Blogs && Blogs.length > 0 ? (
        <ul className="w-[100%] min-h-screen max-h-auto flex flex-row flex-wrap gap-4 justify-center items-center">
          {Blogs.map((currBlog) => {
            const { title, body, _id } = currBlog;

            return (
              <li key={_id}>
                <div className="h-[350px] w-[300px] m-[2rem] bg-blue-50 border border-blue-300 rounded-lg shadow-md p-4 hover:cursor-pointer hover:shadow-lg transform transition-all duration-300 relative">
                  <div className="flex-grow h-[250px] overflow-y-scroll no-scrollbar">
                    <p className="text-blue-900 font-bold text-lg mb-2">
                      Title: {title}
                    </p>
                    <p className="text-gray-700 text-sm">Desc: {body}</p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2">
                    <button
                      onClick={() => handleDelete(_id)}
                      className="h-[40px] w-[45%] bg-red-100 hover:bg-red-300 text-red-700 font-medium rounded-md transition-colors duration-200"
                    >
                      Delete Blog
                    </button>
                    <button
                      onClick={() => handleEdit(_id)}
                      className="h-[40px] w-[45%] bg-blue-100 hover:bg-blue-300 text-blue-700 font-medium rounded-md transition-colors duration-200"
                    >
                      Edit Blog
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <h1 className="text-center text-2xl font-bold text-gray-700 mt-20">
          WRITE A BLOG
        </h1>
      )}
    </>
  );
}

export default AllBlog;
