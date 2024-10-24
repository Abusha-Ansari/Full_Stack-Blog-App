import { useContext, useEffect } from "react";
import { BlogContext } from "../Context/UserContext.jsx";

function AllBlog() {
  const { Blogs, setBlogs } = useContext(BlogContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_FETCH_BLOG_DATA, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.log("fail");
        window.alert(`Fetching blogs failed: ${error.message}`);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      {Blogs && Blogs.length > 0 ? (
        <ul className="w-[100%] min-h-screen max-h-auto flex flex-row flex-wrap gap-4 justify-center items-center">
          {Blogs.map((currBlog) => {
            const { title, body, _id , user} = currBlog;

            return (
              <li key={_id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                <div className="h-[400px] w-full bg-blue-50 border border-blue-300 rounded-lg shadow-md p-4 hover:cursor-pointer hover:shadow-lg transform transition-all duration-300 relative">

                  <div className="h-[150px] w-full bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-gray-500">Image goes here</p>
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
