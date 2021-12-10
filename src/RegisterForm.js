import { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';


function RegisterForm({ showError, showSuccess }) {
  const [ email, setEmail ] = useState('');
  const [ confirmEmail, setConfirmEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ givenName, setGivenName ] = useState('');
  const [ familyName, setFamilyName ] = useState('');
  const [ fullName, setFullName ] = useState('');
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');
  const [pending, setPending] = useState(null);
  const navigate = useNavigate();

  const emailError = 
    !email ? 'Email is required' :
    !email.includes('@') ? 'Email must include @ sign' :
    '';
  
  const passwordError = 
    !password ? 'password is required' :
    password.length < 8 ? 'Password must be at least 8 characters' :
    '';

  const confirmEmailError =
    !confirmEmail ? 'Please confirm email' :
    confirmEmail !== email ? 'Emails do not match' :
    '';

  const confirmPasswordError =
    !confirmPassword ? 'Please confirm password' :
    confirmPassword !== password ? 'Passwords do not match' :
    '';

  const givenNameError = !givenName ? 'Given Name is required' : '';
  const familyNameError = !familyName ? 'Family Name is required' : '';
  const fullNameError = !fullName ? 'Full Name is required' : '';

  function onClickRegister(evt) {
    evt.preventDefault();
    setPending(true);
    setError('');
    setSuccess('');

    if (emailError || passwordError || confirmEmailError || confirmPasswordError || givenNameError || familyNameError || fullNameError) {
      setError('Please fix errors');
      showError('Please fix errors');
      return;
    }

    axios(`${process.env.REACT_APP_API_URL}/api/user/register`, {
      method: 'post',
      data: {email, password, givenName, familyName, fullName}
    })
    .then(res => {
      setPending(false);
      setSuccess(res.data.message);
      // const authPayload = jwt.decode(res.data.token);
      // const auth = {
      //   token: res.data.token,
      //   payload: authPayload
      // };
      showSuccess('Account Registered!')
      navigate('/login');
    })
    .catch(err => {
      setPending(false);
      const resError = err?.response?.data?.error;
      if (resError) {
        if (typeof resError === 'string') {
          setError(resError);
          showError(resError)
        } else if (resError.details) {
          setError(_.map(resError.details, x => <div>{x.message}</div>));
        } else {
          setError(JSON.stringify(resError));
        }
      } else {
        setError(err.message);
        showError(resError)
      }
    });
  }

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }

    return (
      <div id="RegisterForm" className="RegisterForm">
        <h1 className="RegisterForm-Header m-3 text-center">Register</h1>
        <form className="RegisterForm-Form m-3 p-3">
          <InputField 
            label="Given Name (First Name)"
            id="RegisterForm-GivenName"
            type="text"
            placeholder=""
            value={givenName}
            onChange={(evt) => onInputChange(evt, setGivenName)}
            error={givenNameError}
          />
          <InputField 
            label="Family Name (Last Name)"
            id="RegisterForm-FamilyName"
            type="text"
            placeholder=""
            value={familyName}
            onChange={(evt) => onInputChange(evt, setFamilyName)}
            error={familyNameError}
          />
          <InputField 
            label="Full Name"
            id="RegisterForm-FullName"
            type="text"
            placeholder=""
            value={fullName}
            onChange={(evt) => onInputChange(evt, setFullName)}
            error={fullNameError}
          />
          <InputField 
            label="Email"
            id="RegisterForm-Email"
            type="email"
            placeholder="johndoe@example.com"
            value={email}
            onChange={(evt) => onInputChange(evt, setEmail)}
            error={emailError}
          />
          <InputField 
            label="Confirm Email"
            id="RegisterForm-EmailConfirm"
            type="email"
            placeholder="johndoe@example.com"
            value={confirmEmail}
            onChange={(evt) => onInputChange(evt, setConfirmEmail)}
            error={confirmEmailError}
          />
          <InputField 
            label="Password"
            id="RegisterForm-Password"
            type="password"
            placeholder=""
            value={password}
            onChange={(evt) => onInputChange(evt, setPassword)}
            error={passwordError}
          />
          <InputField 
            label="Confirm Password"
            id="RegisterForm-PasswordConfirm"
            type="password"
            placeholder=""
            value={confirmPassword}
            onChange={(evt) => onInputChange(evt, setConfirmPassword)}
            error={confirmPasswordError}
          />
          <div className="d-flex justify-content-between mt-3">
            <button type="submit" className="RegisterForm-Submit btn btn-success" onClick={(evt) => onClickRegister(evt)}>Register</button>
            <div>
              <div>Already Have an Account?</div>
              <Link to="/login" className="text-black">Click Here to Sign In</Link>
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

export default RegisterForm;