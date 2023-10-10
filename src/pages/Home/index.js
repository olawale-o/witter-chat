import { useState, useEffect } from 'react';
import {
  useNavigate,
  useLoaderData,
  useOutletContext,
  Link,
} from 'react-router-dom';
import { loginService } from '../../services/authService';
import { useUserDispatch } from '../../hooks/useUser';

import './style.css';

export async function loader() {
  return JSON.parse(localStorage.getItem("user"));
}

const Home = () => {
  const [startSocket] = useOutletContext()
  const { setUser } = useUserDispatch();
  const data = useLoaderData();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await loginService({
      username: formValues.username,
      password: formValues.password,
    });
    if (data && data?.user) {
      localStorage.setItem('user', JSON.stringify(data));
      startSocket(data.user);
      setUser((prevState) => ({ ...prevState, ...data?.user }));
      navigate('/chat');
    }
  };
  useEffect(() => {    
    if (data !== null && data?.user !== null) {
      navigate('/chat');
    }
  }, [data, navigate]);

  const onFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="home">
      <div className="login-card">
        <div className="card-header">
          <div className="log">Login</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              required=""
              name="username"
              id="username"
              type="text"
              value={formValues.username}
              onChange={onFormChange}
              className="auth-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              required=""
              name="password"
              id="password"
              type="password"
              value={formValues.password}
              onChange={onFormChange}
              className="auth-input"
            />
          </div>
          <div className="form-group">
            <input value="Login" type="submit" />
          </div>
        </form>
        <span>Don't have an account? {'  '} <Link to="/register">Register</Link></span>
      </div>
    </div>
  )
}

export default Home;
