import { useEffect } from 'react';
import {
  useNavigate,
  useLoaderData,
  useOutletContext,
  Link,
} from 'react-router-dom';
import { loginService } from '../../../services/authService';
import { useUserDispatch } from '../../../hooks/useUser';

import '../style.module.css';
import { useForm } from '../../../hooks/useForm';

export async function loader() {
  return JSON.parse(localStorage.getItem("user"));
}

const Login = () => {
  const [startSocket] = useOutletContext();
  const { setUser } = useUserDispatch();
  const data = useLoaderData();
  const navigate = useNavigate();
  const { isSubmitting, register, handleSubmit } = useForm({ defaultValues: { username: '', password: '' } });

  const onSubmit = async (formValues) => {
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
  }, []);

  return (
    <div className="container flex">
      <div className="form-card center">
        <div className="card-header">
          <div className="log">Login</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-field">
            <label htmlFor="username">Username:</label>
            <input
              required=""
              name="username"
              id="username"
              type="text"
              className="input"
              placeholder="Email or username"
              {...register("username")}
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
              placeholder="******"
              {...register("password")}
            />
          </div>
          <div className="form-field">
            <button
              type="submit"
              className="submit"
              aria-disabled={isSubmitting}
            >
              Log in
            </button>
          </div>
        </form>
        <div className="form-card--footer">
          <span className="form-card__text">
            Don't have an account? {' '}
          </span>
          <Link className="form-card__text-link" to="/register">Create</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;
