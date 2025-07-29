import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './Contexts/Protectedroute.jsx';
import { AuthProvider } from './Contexts/Authcontext.jsx';

// pages
import Landingpage from './Pages/Landingpage.jsx';
import Entry from './Pages/Entry.jsx';
import Mainpage from './Pages/Mainpage.jsx';
import Login from './Pages/Login.jsx';
import Chatpage from './Pages/Chatpage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landingpage />,
  },
  {
    children: [
      {
        path: '/entry',
        element: <Entry />,
      },
      {
        path: '/mainpage',
        element: (
          <ProtectedRoute>
            <Mainpage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/chat/:id',
        element: (
          <ProtectedRoute>
            <Chatpage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* ✅ wrap app with AuthProvider */}
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);
