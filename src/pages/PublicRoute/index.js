import { useEffect } from "react";
import { Outlet, useLoaderData, useOutletContext, useNavigate } from "react-router-dom";
import AuthProvider from "../../context/auth";

export async function loader() {
  return JSON.parse(localStorage.getItem("user"));
}

export default function PublicRoute() {
  const navigate = useNavigate();
  const [socket] = useOutletContext();
  const data = useLoaderData();
  useEffect(() => {
    if (data !== null) {
      navigate('/chat')
    }
  }, []);
  return (
    <AuthProvider socket={socket}>
      <Outlet />
    </AuthProvider>
  );
}