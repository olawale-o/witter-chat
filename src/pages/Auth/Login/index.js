import { useEffect, useState } from 'react';
import {
  useNavigate,
  useLoaderData,
  useOutletContext,
  Link,
} from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { loginService } from '../../../services/authService';
import { useUserDispatch } from '../../../hooks/useUser';

import '../style.css';
import { useForm } from '../../../hooks/useForm';
import { LoginSchema } from '../validations';

export async function loader() {
  return JSON.parse(localStorage.getItem("user"));
}

const Login = () => {
  const [startSocket] = useOutletContext();
  const { setUser } = useUserDispatch();
  const data = useLoaderData();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const {
    isSubmitting,
    register,
    handleSubmit,
    control,
    errors,
    trigger
  } = useForm({
    defaultValues: { username: '', password: '' },
    schema: LoginSchema
  });

  const onSubmit = async (formValues) => {
    try {
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
    } catch(e) {
      setError(e.message);
    }
  };
  useEffect(() => {    
    if (data !== null && data?.user !== null) {
      navigate('/chat');
    }
  }, []);

  return (
    <div className="container flex">
      <div className="content flex center">
        <div className="form-card center">
          <div className="card-header">
            <div className="log">Login</div>
          </div>
          <span className="error-text">{error}</span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <label htmlFor="username">Username:</label>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value, } }) => (
                  <input
                    id="username"
                    type="text"
                    className="input"
                    placeholder="Email or username"
                    onChange={onChange}
                    onBlur={() => trigger("username")}
                    value={value}
                  />
                )}
              />
              {errors.username && <span className="error-text">{errors.username["message"]}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                id="password"
                type="password"
                className="input"
                placeholder="******"
                {...register("password")}
              />
              {errors.password && <span className="error-text">{errors.password["message"]}</span>}
            </div>
            <div className="form-field">
              <button
                type="submit"
                className="submit"
                aria-disabled={isSubmitting}
              >
                {
                  isSubmitting ? (<svg className="svg" viewBox="25 25 50 50"><circle r="20" cy="50" cx="50"></circle></svg>) : 'Log in'
                }
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
    </div>
  )
}

export default Login;
