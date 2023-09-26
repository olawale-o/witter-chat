import { Outlet, useOutletContext } from "react-router-dom";
import ChatSideNav from '../../components/ChatSideNav';

import './style.css';
import SocketProvider from "../../context/socket";
import DataProvider from "../../context/data";

export default function PrivateRoute() {
  const [socket] = useOutletContext();
  return (
    <SocketProvider socket={socket}>
      <DataProvider>
        <div className="private">
          <ChatSideNav />
          <Outlet context={[socket]} />
        </div>
      </DataProvider>
      </SocketProvider>
  );
}