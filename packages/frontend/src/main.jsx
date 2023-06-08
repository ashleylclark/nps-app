import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Search from './pages/search/Search'
import Park from './pages/park/Park'
import Hours from './pages/hours/Hours'
import Camping from './pages/camping/Camping'
import Media from './pages/media/Media';

const router = createBrowserRouter([
  { path:"/",
    element: <Search />,
  },
  {
    path: ":id",
    element: <Park />
  },
  {
    path:":id/hours",
    element: <Hours />
  },
  {
    path:":id/camping",
    element: <Camping />
  },
  {
    path:":id/media",
    element: <Media />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
