import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { loader as appLoader } from './App';
import Chat from './pages/Chat';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import socket from './socket';
import Home, { action as loginAction, loader as homeLoader } from './pages/Home';
import Register, { action as registerAction } from './pages/Home/Register';
import Profile, { action as profileAction, loader as profileLoader } from './pages/Profile/Profile';
import Map from './pages/Map';
import NewPassword from './pages/Profile/NewPassword';
import Friends from './pages/Friends';
import FriendRequest from './pages/Friends/Request';
import FriendSuggestion from './pages/Friends/Suggestion';
import './index.css';
import PublicRoute, { loader as publicLoader } from './pages/PublicRoute';
import PrivateRoute, { loader as privateLoader } from './pages/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App socket={socket} />,
    id: "root",
    loader: appLoader,
    children: [
      // { index: true, element: <Home />, action: loginAction, loader: homeLoader },
      {
        element: <PublicRoute />,
        loader: publicLoader,
        children: [
          { path: 'register', element: <Register />, action: registerAction, loader: homeLoader },
          { path: 'login', element: <Home />, action: loginAction, loader: homeLoader },
        ]
      },
      {
        element: <PrivateRoute />,
        loader: privateLoader,
        children: [
          { path: 'chat', element: <Chat />, },
          {
            path: 'friends',
            element: <Friends />,
            children: [
              { index: true, element: <FriendSuggestion /> },
              { path: 'suggestions', element: <FriendSuggestion /> },
              { path: 'request', element: <FriendRequest /> },
            ],
          },
        ]
      },
      { 
        path: 'profile',
        children: [
          { index: true, element: <Profile />, action: profileAction, loader: profileLoader },
          { path: 'password', element: <NewPassword />, action: profileAction, loader: profileLoader },
        ],
      },
      { path: 'map', element: <Map /> },
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
