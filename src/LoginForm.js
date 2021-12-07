import { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {FaDoorOpen} from 'react-icons/fa';
import InputField from './InputField';


function LoginForm({ onLogin, showError }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pending, setPending] = useState(null);

  const emailError =
    !email ? 'Email is required' :
    !email.includes('@') ? 'Email must include @' :
    '';
  
  const passwordError =
    !password ? 'Password is required' :
    password.length < 8 ? 'Password must be at least 8 characters' :
    '';

  function onClickLogin(evt) {
    evt.preventDefault();
    setPending(true);
    setError('');
    setSuccess('');

    if (emailError || passwordError) {
      setError('Please fix errors');
      showError('Please fix errors');
      setPending(false);
      return;
    }

    axios(`${process.env.REACT_APP_API_URL}/api/user/login`, {
      method: 'post',
      data: { email, password }
    })
    .then(res => {
      setPending(false);
      setSuccess(res.data.message);
      const authPayload = jwt.decode(res.data.token);
      const auth = {
        email,
        userId: res.data.userId,
        token: res.data.token,
        payload: authPayload
      };
      onLogin(auth);
    })
    .catch(err => {
      setPending(false);
      const resError = err?.response?.data?.error;
      if(resError) {
        if (typeof resError === 'string') {
          setError(resError);
          showError(resError);
        } else if (resError.details) {
          setError(_.map(resError.details, x => <div>{x.message}</div>))
        } else {
          setError(JSON.stringify(resError));
        }
      } else {
        setError(err.message);
        showError(resError);
      }
    });
  }

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }

  return (
    <div id="LoginForm" className="LoginForm">
      <h1 className="LoginForm-Header m-3 text-center">Login</h1>
      <form className="LoginForm-Form m-3 p-3">
        <InputField 
          label="Email"
          id="LoginForm-Email"
          type="email"
          placeholder="johndoe@example.com"
          value={email}
          onChange={(evt) => onInputChange(evt, setEmail)}
          error={emailError}
        />
        <InputField 
          label="Password"
          id="LoginForm-Password"
          type="password"
          placeholder=""
          value={password}
          onChange={(evt) => onInputChange(evt, setPassword)}
          error={passwordError}
        />
        <div className="d-flex justify-content-between mt-3">
          <button type="submit" className="LoginForm-Submit btn btn-primary btn-lg" onClick={(evt) => onClickLogin(evt)}>
            <FaDoorOpen className="me-2 mb-1"/>
            Login
            </button>
          <div>
            <div>Don't Have an Account?</div>
            <Link to="/register" className="text-black">Click Here to Register</Link>
          </div>
        </div>
        <div className="mt-3 text-danger">{error}</div>
        <div className="mt-3 text-success">{success}</div>
        {pending && (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginForm;