import axios from 'axios'

const app = axios.create({
    baseURL : "https://jsonplaceholder.typicode.com"
});


// Get
export const getData = () => {
    return app.get("/posts");
};

// Post (using manual add using hooks)
export const postData = (blog)=>{
    return app.post("/posts" , blog);
};

// Put
export const putData = ()=>{
    return app.put("");
};

// Delete
export const deleteData = (id)  =>{
    return app.delete(`/posts/${id}`);
};

