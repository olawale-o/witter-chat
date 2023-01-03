import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Chat from './pages/Chat';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import socket from './socket';
import Home, { action as loginAction, loader as homeLoader } from './pages/Home';
import Register from './pages/Home/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App socket={socket} />,
    children: [
      { index: true, element: <Home />, action: loginAction, loader: homeLoader },
      { path: 'register', element: <Register />, action: loginAction, loader: homeLoader },
      { path: 'login', element: <Home />, action: loginAction, loader: homeLoader },
      { path: 'chat', element: <Chat /> },
    ]
  },
]);

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
