import { createContext, useState, useEffect } from "react";
export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [Blogs, setBlogs] = useState([]);

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
            window.alert(`Fetching blogs failed: ${error.message}`);
          }
        };
    
        fetchBlogs(); 
      }, []);

    const [loggedIn,setloggedIn] = useState(localStorage.getItem('token')? true:false);

    const Logout = () => {
        localStorage.removeItem('token')
        setloggedIn(false)
    }

    return (
        <BlogContext.Provider value={{ Blogs, setBlogs , Logout , loggedIn , setloggedIn}}>
            {children}
        </BlogContext.Provider>
    );
};