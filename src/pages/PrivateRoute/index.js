
import { useOutletContext } from "react-router-dom";

import './style.css';
import SocketProvider from "../../context/socket";
import DataProvider from "../../context/data";
import { PrivatePageLayout } from "./Layout";

export default function PrivateRoute() {
  const [socket] = useOutletContext();

  return (
    <SocketProvider socket={socket}>
      <DataProvider>
        <PrivatePageLayout socket={socket} />
      </DataProvider>
      </SocketProvider>
  );
}