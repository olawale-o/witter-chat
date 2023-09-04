import { useEffect } from "react";
import { Outlet, useLoaderData, useOutletContext, useNavigate } from "react-router-dom";
import ChatSideNav from '../../components/ChatSideNav';

import './style.css';
import SocketProvider from "../../context/socket";

export async function loader() {
  return JSON.parse(localStorage.getItem("user"));
}

export default function PrivateRoute() {
  const navigate = useNavigate();
  const [socket] = useOutletContext();
  const data = useLoaderData();
  useEffect(() => {
    if (data === null) {
      navigate('/login')
    }
  }, []);
  return (
    <SocketProvider socket={socket}>
      <div className="private">
        <ChatSideNav />
        <Outlet context={[socket]} />
      </div>
    </SocketProvider>
  );
}