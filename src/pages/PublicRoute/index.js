import { Outlet, useOutletContext, } from "react-router-dom";

export default function PublicRoute() {
  const [socket] = useOutletContext();
  const startSocket = (user) => {
    const { username, _id, name } = user;
    socket.auth = { user: { username, _id, name } };
    socket.connect();
  }
  return (<Outlet context={[startSocket]} />);
}