import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import socket from './socket';
import App from './App';
import Chat from './pages/Chat';
import Home, { action as loginAction, loader as homeLoader } from './pages/Home';
import Register, { action as registerAction } from './pages/Home/Register';
import Profile, { action as profileAction, loader as profileLoader } from './pages/Profile/Profile';
import Map from './pages/Map';
import NewPassword from './pages/Profile/NewPassword';
import Friends, { loader as connectionLoader } from './pages/Friends';
import FriendRequest from './pages/Friends/Request';
import FriendSuggestion, { loader as followersLoader } from './pages/Friends/Suggestion';
import PublicRoute from './pages/PublicRoute';
import PrivateRoute from './pages/PrivateRoute';
import Followers from './pages/Friends/Followers';
import Following from './pages/Friends/Following';
import {  QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import './index.css';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App socket={socket} />,
    id: "root",
    children: [
      // { index: true, element: <Home />, action: loginAction, loader: homeLoader },
      {
        element: <PublicRoute />,
        children: [
          { path: 'register', element: <Register />, action: registerAction, loader: homeLoader },
          { path: 'login', element: <Home />, action: loginAction, loader: homeLoader },
        ]
      },
      {
        element: <PrivateRoute />,
        children: [
          { path: 'chat', element: <Chat /> },
          {
            path: 'friends',
            element: <Friends />,
            loader: connectionLoader,
            children: [
              { index: true, element: <FriendSuggestion />, loader: followersLoader },
              { path: 'suggestions', element: <FriendSuggestion />, loader: followersLoader },
              { 
                path: 'request',
                element: <FriendRequest />,
                children: [
                  { index: true, element: <Followers /> },
                  { path: 'followers', element: <Followers /> },
                  { path: 'following', element: <Following /> }
                ]
              },
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
