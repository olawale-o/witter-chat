import { useEffect } from 'react';
import {
  useNavigate,
  Link,
  useLoaderData,
  useOutletContext,
} from 'react-router-dom';
import { registerService } from '../../../services/authService';
import { useUserDispatch } from '../../../hooks/useUser';

import '../style.css';
import { useForm } from '../../../hooks/useForm';

export async function loader() {
  return JSON.parse(localStorage.getItem("user"));
}

const Register = () => {
  const [startSocket] = useOutletContext();
  const { setUser } = useUserDispatch();
  const data = useLoaderData();
  const navigate = useNavigate();
  const {
    isSubmitting,
    register,
    handleSubmit
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      fullname: '',
    }
  });

  const onSubmit = async (formValues) => {
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

  return (
    <div className="container flex">
      <div className="form-card center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group space-between">
            <div className="form-field">
              <label htmlFor="username">Username:</label>
              <input
                required=""
                name="username"
                id="username"
                type="text"
                className="input"
                {...register("username")}
              />
            </div>
            <div className="form-field">
              <label htmlFor="fullname">Full name:</label>
              <input
                required=""
                name="fullname"
                id="fullName"
                type="text"
                className="input"
                {...register("fullname")}
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              required=""
              name="email"
              id="email"
              type="email"
              className="input"
              {...register("email")}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password:</label>
            <input
              required=""
              name="password"
              id="password"
              type="password"
              className="input"
              {...register("password")}
            />
          </div>
          <div className="form-field">
            <button className="submit" type="submit" aria-disabled={isSubmitting}>Create</button>
          </div>
        </form>
        <div className="form-card--footer">
          <span className="form-card__text">
            Already have an account? {'  '}
           </span> 
            <Link className="form-card__text-link"  to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
