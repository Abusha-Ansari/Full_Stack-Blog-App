import { createContext, useState, useEffect } from "react";
export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [Blogs, setBlogs] = useState(() => {
        try {
            const storedBlogs = JSON.parse(localStorage.getItem('myArrayKey'));
            return storedBlogs || [];
        } catch (error) {
            console.error("Failed to parse blogs from local storage:", error);
            return [];
        }
    });

    const [loggedIn,setloggedIn] = useState(true);

    const Logout = () => {
        setloggedIn(false)
    }

    useEffect(() => {
        localStorage.setItem('myArrayKey', JSON.stringify(Blogs));
    }, [Blogs]);

    return (
        <BlogContext.Provider value={{ Blogs, setBlogs , Logout , loggedIn , setloggedIn}}>
            {children}
        </BlogContext.Provider>
    );
};