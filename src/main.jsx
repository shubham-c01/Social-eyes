import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Landingpage from './Pages/Landingpage.jsx'
import Entry from './Pages/Entry.jsx'
import Mainpage from './Pages/Mainpage.jsx'
import Login from './Pages/Login.jsx'

const router=createBrowserRouter([
  {
    path: '/',
    element: <Landingpage />    
  },
  {
    children:[
      {
        path: '/entry',
        element: <Entry />
      },
      {
        path: '/mainpage',
        element: <Mainpage />
      },
      {
        path:'/login',
        element:<Login/>
      }
      
    ]
  }
  

  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
