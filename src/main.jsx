import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider, useParams } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Landingpage from './Pages/Landingpage.jsx'
import Entry from './Pages/Entry.jsx'
import Mainpage from './Pages/Mainpage.jsx'
import Login from './Pages/Login.jsx'
import Chatpage from './Pages/Chatpage.jsx'
import Logout from './Pages/Logout.jsx'
import EditProfile from './Pages/EditProfile.jsx'


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
      },
      {
        path:'/chat/:id',
        element:<Chatpage/>
      },{
        path:'/logout',
        element:<Logout/>
      }
      ,{
        path:'/edit',
        element:<EditProfile/>
      }
      
    ]
  }
  

  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
