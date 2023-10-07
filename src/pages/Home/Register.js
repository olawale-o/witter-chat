import React from 'react';
import {
  useNavigate,
  Form,
  redirect,
  useLoaderData,
  useOutletContext,
} from 'react-router-dom';
import { registerService } from '../../services/authService';
import './style.css';

export async function loader() {
  return JSON.parse(localStorage.getItem("user"));
}

export async function action({ request }) {
  const formData = await request.formData();
  const formDataEntries = Object.fromEntries(formData);
  const data = await registerService({
    username: formDataEntries.username,
    password: formDataEntries.password,
    email: formDataEntries.email,
    name: formDataEntries.fullname,
  });
  localStorage.setItem('user', JSON.stringify(data));
  return redirect('/register');
}

const Register = () => {
  const [startSocket] = useOutletContext();
  const data = useLoaderData();
  const navigate = useNavigate();
  const [formValues, setFormValues] = React.useState({
    username: '',
    password: '',
    email: '',
    fullname: '',
  });

  React.useEffect(() => {    
    if (data !== null && data.user !== null) {
      startSocket(data?.user);
      navigate('/chat');
    }
  }, [data, navigate]);

  const onFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="home">
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
          id="password"
          type="text"
          value={formValues.fullname}
          onChange={onFormChange}
          className="auth-input"
        />
      </div>
      <div className="form-group">
        <input value="Create" type="submit" />
      </div>
    </Form>
  </div>
  );
}

export default Register;
