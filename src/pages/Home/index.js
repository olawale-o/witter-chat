import { useState, useEffect } from 'react';
import {
  useNavigate,
  Form,
  redirect,
  useLoaderData,
  useOutletContext,
} from 'react-router-dom';
import { loginService } from '../../services/authService';
import { useUserDispatch } from '../../hooks/useUser';

import './style.css';

export async function loader() {
  return JSON.parse(localStorage.getItem("user"));
}

export async function action({ request }) {
  const formData = await request.formData();
  const formDataEntries = Object.fromEntries(formData);
  const data = await loginService({
    username: formDataEntries.username,
    password: formDataEntries.password,
  });
  localStorage.setItem('user', JSON.stringify(data));
  return redirect('/login');
}

const Home = () => {
  const [startSocket] = useOutletContext();
  const { setUser } = useUserDispatch();
  const data = useLoaderData();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {    
    if (data !== null && data.user !== null) {
      startSocket(data?.user)
      setUser((prevState) => ({ ...prevState, ...data?.user }));
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
        <Form method="post">
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
        </Form>
      </div>
    </div>
  )
}

export default Home;
