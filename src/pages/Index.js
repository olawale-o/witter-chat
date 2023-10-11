import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Index = () => {
  const sessionId = localStorage.getItem("sessionId")
  const navigate = useNavigate();
  useEffect(() => {
    console.log(sessionId);
    if (!sessionId) {
      navigate('/login',);
    } else {
      navigate('/chat');
    }
  }, [sessionId, navigate]);
  return <div>This is an index page of the app</div>
}

export { Index };