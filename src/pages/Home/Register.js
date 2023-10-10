import {  useState, useEffect } from 'react';
import {
  useNavigate,
  Link,
  useLoaderData,
  useOutletContext,
} from 'react-router-dom';
import { registerService } from '../../services/authService';
import './style.css';
import { useUserDispatch } from '../../hooks/useUser';

export async function loader() {
  return JSON.parse(localStorage.getItem("user"));
}

const Register = () => {
  const [startSocket] = useOutletContext();
  const { setUser } = useUserDispatch();
  const data = useLoaderData();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    email: '',
    fullname: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await registerService({
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
      name: formValues.fullname,
    });
    if (data && data?.user) {
      localStorage.setItem('user', JSON.stringify(data));
      startSocket(data.user);
      setUser((prevState) => ({ ...prevState, ...data?.user }));
      navigate('/chat');
    }
  };

  useEffect(() => {    
    if (data !== null && data.user !== null) {
      navigate('/chat');
    }
  }, [data, navigate]);

  const onFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="home">
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
        <label htmlFor="email">Email:</label>
        <input
          required=""
          name="email"
          id="email"
          type="email"
          value={formValues.email}
          onChange={onFormChange}
          className="auth-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="fullname">Full name:</label>
        <input
          required=""
          name="fullname"
          id="fullName"
          type="text"
          value={formValues.fullname}
          onChange={onFormChange}
          className="auth-input"
        />
      </div>
      <div className="form-group">
        <input value="Create" type="submit" />
      </div>
    </form>
    <span>Already have an account? {'  '} <Link to="/register">Log in</Link></span>
  </div>
  );
}

export default Register;
