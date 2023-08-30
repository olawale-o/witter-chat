import { useEffect } from "react";
import { Outlet, useLoaderData, useOutletContext, useNavigate } from "react-router-dom";

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
  return (<Outlet context={[socket]} />);
}