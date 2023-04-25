import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import Forms from './pages/Forms';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />

  },
  {
    path:"/signup",
    element: <Signup />

  },
  {
    path:"/login",
    element: <LoginPage />

  },
  {
    path:"/dashboard",
    element: <Dashboard />

  },
  {
    path:"/forms",
    element: <Forms />

  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();