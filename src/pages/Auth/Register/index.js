import { useEffect, useState } from 'react';
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
import { SignUpSchema } from '../validations';

export async function loader() {
  return JSON.parse(localStorage.getItem("user"));
}

const Register = () => {
  const [startSocket] = useOutletContext();
  const { setUser } = useUserDispatch();
  const data = useLoaderData();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const {
    isSubmitting,
    register,
    handleSubmit,
    errors,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      fullname: '',
    },
    schema: SignUpSchema
  });

  const onSubmit = async (formValues) => {
    try {
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
    } catch(e) {
      setError(e.message);
    }
  };

  useEffect(() => {    
    if (data !== null && data.user !== null) {
      navigate('/chat');
    }
  }, [data, navigate]);

  return (
    <div className="container flex">
      <div className="content flex center">
        <div className="form-card center">
          <span className="error-text">{error}</span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group space-between">
              <div className="form-field">
                <label htmlFor="username">Username:</label>
                <input
                  name="username"
                  id="username"
                  type="text"
                  className="input"
                  {...register("username")}
                />
                {errors.username && <span className="error-text">{errors.username["message"]}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="fullname">Full name:</label>
                <input
                  name="fullname"
                  id="fullName"
                  type="text"
                  className="input"
                  {...register("fullname")}
                />
                {errors.fullname && <span className="error-text">{errors.fullname["message"]}</span>}
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                id="email"
                type="email"
                className="input"
                {...register("email")}
              />
              {errors.email && <span className="error-text">{errors.email["message"]}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                id="password"
                type="password"
                className="input"
                {...register("password")}
              />
              {errors.password && <span className="error-text">{errors.password["message"]}</span>}
            </div>
            <div className="form-field">
              <button className="submit" type="submit" aria-disabled={isSubmitting}>
                {
                  isSubmitting ? (<svg className="svg" viewBox="25 25 50 50"><circle r="20" cy="50" cx="50"></circle></svg>) : 'Create'
                }
              </button>
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
    </div>
  );
}

export default Register;
