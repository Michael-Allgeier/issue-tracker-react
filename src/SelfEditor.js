/* eslint-disable no-restricted-globals */
import _ from  'lodash';
import { useState, useEffect } from 'react';
import {FaUserEdit} from 'react-icons/fa';
import InputField from './InputField';
import axios from 'axios';

function SelfEditor({ auth, showError, showSuccess }) {
  const [user, setUser] = useState(null);
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pending, setPending] = useState(true);

  const givenNameError = !givenName ? 'Given Name (First Name) is required' : '';
  const familyNameError = !familyName ? 'Family Name (Last Name) is required' : '';
  const fullNameError = !fullName ? 'Full Name is required' : '';

  const emailError = !email ? 'Email is required' : '';
  const confirmEmailError = confirmEmail !== email ? 'Emails do not match' : '';

  const passwordError = !password ? '' : password.length < 8 ? 'Password must be at least 8 characters' : '';
  const confirmPasswordError = confirmPassword !== password ? 'Passwords do not match' : '';

  useEffect(() => {
    if (!auth) {
      setError('Must Be Logged In');
      setPending(false);
      return;
    }
    setPending(true);
    setError('');
    setSuccess('');
    axios(`${process.env.REACT_APP_API_URL}/api/user/me`, {
      method: 'get',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
    })
    .then((res) => {
      setPending(false);
      setUser(res.data);
      setGivenName(res.data.givenName);
      setFamilyName(res.data.familyName);
      setFullName(res.data.fullName);
      setEmail(res.data.email);
      setConfirmEmail(res.data.email);
      showSuccess('Profile Loaded!');
    })
    .catch((err) => {
      setPending(false);
      setError(err.message);
      showError(err.message);
    });
  }, [auth, showError, showSuccess]);

  function onClickSubmitEdit(evt) {
    evt.preventDefault();
    if (givenNameError || familyNameError || fullNameError || passwordError || confirmPasswordError) {
      setError('Please fix errors');
      showError('Please fix errors');
      return;
    }

    axios(`${process.env.REACT_APP_API_URL}/api/user/me`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: { givenName, familyName, fullName, email, password: password ? password : undefined},
    })
      .then((res) => {
        setPending(false);
        setError('');
        setSuccess('User Updated!');
        showSuccess('User Updated!');
      })
      .catch((err) => {
        setPending(false);
        const resError = err?.response?.data?.error;
        if (resError) {
          console.error(resError);
          if (typeof resError === 'string') {
            setError(resError);
            showError(resError);
          } else if (resError.details) {
            setError(_.map(resError.details, (x) => <div>{x.message}</div>));
          } else {
            setError(JSON.stringify(resError));
          }
        } else {
          console.error(err);
          setError(err.message);
          showError(err.message);
        }
      });
  }

  // function onClickDeleteSelf(evt) {
  //   evt.preventDefault();
  //   if (confirm('Are you sure you want to delete your account?')) {
  //     axios(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
  //       method: 'delete',
  //       headers: {
  //         authorization: `Bearer ${auth?.token}`,
  //       },
  //     })
  //       .then((res) => {
  //         setPending(false);
  //         setError('');
  //         showSuccess(`${user?.fullName} Deleted!`);
  //         navigate('/login');
  //       })
  //       .catch((err) => {
  //         setPending(false);
  //         const resError = err?.response?.data?.error;
  //         if (resError) {
  //           console.error(resError);
  //           if (typeof resError === 'string') {
  //             setError(resError);
  //             showError(resError);
  //           } else if (resError.details) {
  //             setError(_.map(resError.details, (x) => <div>{x.message}</div>));
  //           } else {
  //             setError(JSON.stringify(resError));
  //           }
  //         } else {
  //           console.error(err);
  //           setError(err.message);
  //           showError(err.message);
  //         }
  //       });
  //   } else {
  //   }
  // }

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }


  return (
    <div className="UserEditor">
      {pending && (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!pending && user && (
        <div className="UserEditor-Form p-3">
          <h1 className="UserEditor-Header text-center">{user?.fullName}</h1>
          <form>
            <h2>Edit Account</h2>
            <InputField
              label="Given Name (First Name)"
              id="UserEditor-GivenName"
              type="text"
              value={givenName}
              onChange={(evt) => onInputChange(evt, setGivenName)}
              error={givenNameError}
            />
            <InputField
              label="Family Name (Last Name)"
              id="UserEditor-FamilyName"
              type="text"
              value={familyName}
              onChange={(evt) => onInputChange(evt, setFamilyName)}
              error={familyNameError}
            />
            <InputField
              label="Full Name"
              id="UserEditor-FullName"
              type="text"
              value={fullName}
              onChange={(evt) => onInputChange(evt, setFullName)}
              error={fullNameError}
            />
            <InputField
              label="Email"
              id="UserEditor-Email"
              type="email"
              value={email}
              onChange={(evt) => onInputChange(evt, setEmail)}
              error={emailError}
            />
            <InputField
              label="Confirm Email"
              id="UserEditor-ConfirmEmail"
              type="email"
              value={confirmEmail}
              onChange={(evt) => onInputChange(evt, setConfirmEmail)}
              error={confirmEmailError}
            />
            <InputField
              label="Password"
              id="UserEditor-Password"
              type="password"
              value={password}
              onChange={(evt) => onInputChange(evt, setPassword)}
              error={passwordError}
            />
            <InputField
              label="Confirm Password"
              id="UserEditor-ConfirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(evt) => onInputChange(evt, setConfirmPassword)}
              error={confirmPasswordError}
            />
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary mt-1" type="submit" onClick={(evt) => onClickSubmitEdit(evt)}>
                <FaUserEdit className="me-2 mb-1" />
                Submit Edit
              </button>
              {/* <button className="btn btn-danger mt-1" type="submit" onClick={(evt) => onClickDeleteSelf(evt)}>
                <FaTrashAlt className="me-2 mb-1" />
                Delete Account
              </button> */}
            </div>
          </form>
          {error && <div className="mt-1 text-danger">{error}</div>}
          {success && <div className="mt-1 text-success">{success}</div>}
        </div>
      )}
    </div>
  );
}

export default SelfEditor;