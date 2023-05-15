import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Search from './pages/search/Search'
import Park from './pages/park/Park'

const router = createBrowserRouter([
  { path:"/",
    element: <Search />,
  },
  {
    path: "ParkName",
    element: <Park />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
