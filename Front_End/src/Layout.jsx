import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { BlogProvider } from './Context/UserContext';
// import BlogContext from '../Context/UserContext'
const Layout = () => {
  const [Data, setData] = useState([]);
  
  
  return (
    <BlogProvider>
    <div className='h-[100%] w-[100%] overflow-x-hidden'>
      <Navbar/>
      <Outlet context={{ Data, setData }}></Outlet>
    </div>
    </BlogProvider>
  )
}

export default Layout

