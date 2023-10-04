
import { useOutletContext } from "react-router-dom";

import './style.css';
import SocketProvider from "../../context/socket";
import DataProvider from "../../context/data";
import { PrivatePage } from "./Page";

export default function PrivateRoute() {
  const [socket] = useOutletContext();

  return (
    <SocketProvider socket={socket}>
      <DataProvider>
        <PrivatePage socket={socket} />
      </DataProvider>
      </SocketProvider>
  );
}