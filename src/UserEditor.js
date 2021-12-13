/* eslint-disable no-restricted-globals */
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUserEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import axios from 'axios';

function UserEditor({ auth, showError, showSuccess }) {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pending, setPending] = useState(true);
  const navigate = useNavigate();

  const givenNameError = !givenName ? 'Given Name (First Name) is required' : '';
  const familyNameError = !familyName ? 'Family Name (Last Name) is required' : '';
  const fullNameError = !fullName ? 'Full Name is required' : '';

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
    axios(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
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
        setRole(res.data.role);
        showSuccess('User Loaded!');
      })
      .catch((err) => {
        setPending(false);
        setError(err.message);
        showError(err.message);
      });
  }, [userId, auth, showError, showSuccess]);

  function onClickSubmitEdit(evt) {
    evt.preventDefault();
    if (givenNameError || familyNameError || fullNameError || passwordError || confirmPasswordError) {
      setError('Please fix errors');
      showError('Please fix errors');
      return;
    }

    axios(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${auth?.token}`,
      },
      data: { givenName, familyName, fullName, password: password ? password : undefined, role },
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

  function onClickDeleteUser(evt) {
    evt.preventDefault();
    if (confirm('Are you sure you want to remove this user?')) {
      axios(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
        method: 'delete',
        headers: {
          authorization: `Bearer ${auth?.token}`,
        },
      })
        .then((res) => {
          setPending(false);
          setError('');
          showSuccess(`${user?.fullName} Deleted!`);
          navigate('/user/list');
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
    } else {
    }
  }

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }

  function onClickCheckbox(evt) {
    const checked = evt.currentTarget.checked;
    const newValue = evt.currentTarget.value;
    let rolesArray = [];

    if (!_.isEmpty(role)) {
      rolesArray = _.cloneDeep(role); //SOURCE: https://codesource.io/how-to-deep-copy-array-using-lodash/#:~:text=In%20order%20to%20deep%20copy,cloneDeep()%20method.&text=Note%3A%20The%20_.,exact%20copy%20of%20supplied%20values.
    }

    if (checked) {
      rolesArray.push(newValue);
    } else {
      const index = rolesArray.indexOf(newValue);
      rolesArray.splice(index, 1);
    }
    setRole(rolesArray);
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
            <h2>Edit User</h2>
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
              disabled
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
            <div>
              <div>
                <div>Roles*</div>
              </div>
              <div className="form-check">
                {_.includes(role, 'DEV') ? (
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="DEV"
                    id="flexCheckDev"
                    defaultChecked
                    onClick={(evt) => onClickCheckbox(evt)}
                  />
                ) : (
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="DEV"
                    id="flexCheckDev"
                    onChange={(evt) => onClickCheckbox(evt)}
                  />
                )}
                {/* <input className="form-check-input" type="checkbox" value="DEV" id="flexCheckDev" defaultChecked onChange={(evt) => onClickCheckbox(evt)}/> */}
                <label className="form-check-label" htmlFor="flexCheckDev">
                  Developer
                </label>
              </div>
              <div className="form-check">
                {_.includes(role, 'QA') ? (
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="QA"
                    id="flexCheckQA"
                    defaultChecked
                    onClick={(evt) => onClickCheckbox(evt)}
                  />
                ) : (
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="QA"
                    id="flexCheckQA"
                    onChange={(evt) => onClickCheckbox(evt)}
                  />
                )}
                <label className="form-check-label" htmlFor="flexCheckQA">
                  Quality Analyst
                </label>
              </div>
              <div className="form-check">
                {_.includes(role, 'TM') ? (
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="TM"
                    id="flexCheckTM"
                    defaultChecked
                    onClick={(evt) => onClickCheckbox(evt)}
                  />
                ) : (
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="TM"
                    id="flexCheckTM"
                    onChange={(evt) => onClickCheckbox(evt)}
                  />
                )}
                <label className="form-check-label" htmlFor="flexCheckTM">
                  Technical Manager
                </label>
              </div>
              <div className="form-check">
                {_.includes(role, 'BA') ? (
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="BA"
                    id="flexCheckBA"
                    defaultChecked
                    onClick={(evt) => onClickCheckbox(evt)}
                  />
                ) : (
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="BA"
                    id="flexCheckBA"
                    onChange={(evt) => onClickCheckbox(evt)}
                  />
                )}
                <label className="form-check-label" htmlFor="flexCheckBA">
                  Business Analyst
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="PM"
                  id="flexCheckPM"
                  checked={_.includes(role, 'PM')}
                  onChange={(evt) => onClickCheckbox(evt)}
                />
                <label className="form-check-label" htmlFor="flexCheckPM">
                  Product Manager
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary mt-1" type="submit" onClick={(evt) => onClickSubmitEdit(evt)}>
                <FaUserEdit className="me-2 mb-1" />
                Submit Edit
              </button>
              <button className="btn btn-danger mt-1" type="submit" onClick={(evt) => onClickDeleteUser(evt)}>
                <FaTrashAlt className="me-2 mb-1" />
                Delete User
              </button>
            </div>
          </form>
          {error && <div className="mt-1 text-danger">{error}</div>}
          {success && <div className="mt-1 text-success">{success}</div>}
        </div>
      )}
    </div>
  );
}

export default UserEditor;
