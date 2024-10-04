import React, { useContext, useEffect } from 'react'
import { BlogContext } from '../Context/UserContext'
import { useNavigate } from "react-router-dom";

function YourBlogs() {

    const { personalBlogs , setpersonalBlogs , userdata } = useContext(BlogContext);

    const navigate = useNavigate();

    useEffect(() => {
      const fetchPersonalBlog = async ()=>{
        try {
          const response = await fetch(`http://localhost:1234/userblog/${userdata.username}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setpersonalBlogs(data);
        } catch (error) {
          console.log("fail");
          window.alert(`Fetching blogs failed: ${error.message}`);
        }
      }

      fetchPersonalBlog();
    }, [])

    const handleEdit = (id) => {
      navigate(`/edit-blog/${id}`);
    };

    const handleDelete = async (id) => {
      try {
        const response = await fetch(`http://localhost:1234/delete/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const newBlogs = personalBlogs.filter((currItem) => currItem._id !== id);
          setpersonalBlogs(newBlogs);
        } else {
          console.error("Failed to delete blog.");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    };
    
  return (
    <>
    {personalBlogs && personalBlogs.length > 0 ? (
      <ul className="w-[100%] min-h-screen max-h-auto flex flex-row flex-wrap gap-4 justify-center items-center">
        {personalBlogs.map((currBlog) => {
          const { title, body, _id , user} = currBlog;

          return (
            <li key={_id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <div className="h-[400px] w-full bg-blue-50 border border-blue-300 rounded-lg shadow-md p-4 hover:cursor-pointer hover:shadow-lg transform transition-all duration-300 relative">

                <div className="h-[150px] w-full bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-gray-500">User Image</p>
                </div>

                <div className="flex-grow h-[150px] overflow-y-scroll no-scrollbar">
                  <p className="text-blue-900 font-bold text-lg mb-2">
                    Title: {title}
                  </p>
                  <p className="text-blue-900 font-bold text-lg mb-2">
                    Writer: {user}
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
                    className="h-[40px] w-[45%] bg-green-100 hover:bg-green-300 text-green-700 font-medium rounded-md transition-colors duration-200"
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
  )
}

export default YourBlogs