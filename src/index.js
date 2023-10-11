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
import Login, { loader as loginLoader } from './pages/Auth/Login';
import Register, { loader as registerLoader } from './pages/Auth/Register';
import Friends from './pages/Friends';
import FriendRequest from './pages/Friends/Request';
import FriendSuggestion, { loader as followersLoader } from './pages/Friends/Suggestion';
import PublicRoute from './pages/PublicRoute';
import PrivateRoute from './pages/PrivateRoute';
import FollowersPage from './pages/Friends/Followers';
import Following from './pages/Friends/Following';
import {  QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import './index.css';
import { Index } from './pages/Index';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App socket={socket} />,
    id: "root",
    children: [
      { index: true, element: <Index /> },
      {
        element: <PublicRoute />,
        children: [
          { path: 'register', element: <Register />, loader: registerLoader },
          { path: 'login', element: <Login />, loader: loginLoader },
        ]
      },
      {
        element: <PrivateRoute />,
        children: [
          { path: 'chat', element: <Chat /> },
          {
            path: 'friends',
            element: <Friends />,
            children: [
              { index: true, element: <FriendSuggestion />, loader: followersLoader },
              { path: 'suggestions', element: <FriendSuggestion />, loader: followersLoader },
              { 
                path: 'request',
                element: <FriendRequest />,
                children: [
                  { index: true, element: <FollowersPage /> },
                  { path: 'followers', element: <FollowersPage /> },
                  { path: 'following', element: <Following /> }
                ]
              },
            ],
          },
        ]
      },
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
