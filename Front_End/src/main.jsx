import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CreateBlog from './pages/CreateBlog.jsx'
import EditBlog from './pages/EditBlog.jsx'
import About from './pages/About.jsx'
import AllBlog from './pages/AllBlog.jsx'
import Layout from './Layout.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Logout from './pages/Logout.jsx'


const router = createBrowserRouter([
  {
    path: "/", element: <Layout/> , children: [
      {path: "/" , element: <HomePage/>},
      {path: "/all-blog" , element: <AllBlog/>},
      {path: "/create-blog" , element: <CreateBlog />},
      {path: "/edit-blog/:id" , element: <EditBlog/>},
      {path: "/about" , element: <About/>},
      {path: "/login" , element: <Login/>},
      {path: "/signup" , element: <Signup/>},
      {path: "/logout" , element: <Logout/>}
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)