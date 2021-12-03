import _ from "lodash";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import InputField from "./InputField"; 
import SelectField from "./SelectField";
import axios from "axios";


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
  //const [rolesArray, setRolesArray] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pending, setPending] = useState(true);

  const givenNameError = !givenName ? 'Given Name (First Name) is required' : '';
  const familyNameError = !familyName ? 'Family Name (Last Name) is required' : '';
  const fullNameError = !fullName ? 'Full Name is required' : '';
  
  const passwordError = !password ? '' : password.length < 8 ? 'Password must be at least 8 characters' : '';

  const confirmPasswordError = confirmPassword !== password ? 'Passwords do not match' : '';


  useEffect(() => {
    if(!auth) {
      setError('Must be Logged In');
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
    })
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
        authorization: `Bearer ${auth?.token}`
      },
      data: {givenName, familyName, fullName, password: password ? password : undefined, role}
    })
    .then((res) => {
      setPending(false);
      // res.data.givenName = givenName;
      // res.data.familyName = familyName;
      // res.data.fullName = fullName;
      // res.data.email = email;
      // if (password !== '') {
      //   res.data.password = password;
      // }
      setError('');
      setSuccess('User Updated!');
      showSuccess('User Updated!');
    })
    .catch((err) => {
      setPending(false);
      const resError = err?.response?.data?.error;
      if(resError) {
        console.error(resError);
        if (typeof resError === 'string') {
          setError(resError);
          showError(resError);
        } else if (resError.details) {
          setError(_.map(resError.details, x => <div>{x.message}</div>))
        } else {
          setError(JSON.stringify(resError));
        }
      } else {
        console.error(err);
        setError(err.message);
        showError(err.message);
      }
    })
  }

  // function hasRole(thisRole) {
  //   let includesRole = false;
  //   if (role.includes(thisRole)) {
  //     includesRole = true;
  //   }

  //   return includesRole;
  // }

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }

  const rolesArray = [];

  function onClickCheckbox(evt) {
    const checked = evt.currentTarget.checked;
    const newValue = evt.currentTarget.value;

    console.log(checked);

    if (checked) {
      //rolesArray.push(newValue);
    } else {
      const index = rolesArray.indexOf(newValue);
      //rolesArray.splice(index, 1);
    }

    console.log(rolesArray);
    //setRole(rolesArray);
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
          {/* <InputField 
            label="Confirm Email"
            id="UserEditor-ConfirmEmail"
            type="email"
            value={confirmEmail}
            onChange={(evt) => onInputChange(evt, setConfirmEmail)}
            error={confirmEmailError}
          /> */}
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
          {/* <SelectField
            label="Role"
            id="UserEditor-Role"
            type="text"
            onChange={(evt) => onInputChange(evt,setRole)}
            value={role}
          >
            <option value="null">No Role</option>
            <option value="DEV">Developer</option>
            <option value="QA">Quality Analyst</option>
            <option value="TM">TM</option>
            <option value="BA">BA</option>
          </SelectField> */}
          <div>
            <div>Roles*</div>
          </div>
          <div className="form-check">
            {/* {hasRole('DEV') ? (<input className="form-check-input" type="checkbox" value="DEV" id="flexCheckDev" checked onClick={(evt) => onClickCheckbox(evt)}/>) : <input className="form-check-input" type="checkbox" value="DEV" id="flexCheckDev" onClick={(evt) => onClickCheckbox(evt)}/>} */}
            <input className="form-check-input" type="checkbox" value="DEV" id="flexCheckDev" onClick={(evt) => onClickCheckbox(evt)}/>
            <label className="form-check-label" htmlFor="flexCheckDev">
              DEV
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="QA" id="flexCheckQA" onClick={(evt) => onClickCheckbox(evt)}/>
            <label className="form-check-label" htmlFor="flexCheckQA">
              QA
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="TM" id="flexCheckTM" onClick={(evt) => onClickCheckbox(evt)}/>
            <label className="form-check-label" htmlFor="flexCheckTM">
              TM
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="BA" id="flexCheckBA" onClick={(evt) => onClickCheckbox(evt)}/>
            <label className="form-check-label" htmlFor="flexCheckBA">
              BA
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="PM" id="flexCheckPM" onClick={(evt) => onClickCheckbox(evt)}/>
            <label className="form-check-label" htmlFor="flexCheckPM">
              PM
            </label>
          </div>
          <button className="btn btn-success mt-1" type="submit" onClick={(evt) => onClickSubmitEdit(evt)}>
            Submit Edit
          </button>
        </form>
        <div className="my-2">*All Selected Roles Will Be Assigned To {user?.fullName}</div>
        <div>*If An Unchecked Role Is Currently Assigned, It Will Be Unassigned From {user?.fullName}</div>
        {error && <div className="mt-1 text-danger">{error}</div>}
        {success && <div className="mt-1 text-success">{success}</div>}
      </div>
      )}
    </div>
  );
}

export default UserEditor;