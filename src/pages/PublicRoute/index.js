import { Outlet, useOutletContext, } from "react-router-dom";
import AuthProvider from "../../context/auth";

export default function PublicRoute() {
  const [socket] = useOutletContext();
  return (
    <AuthProvider socket={socket}>
      <Outlet />
    </AuthProvider>
  );
}