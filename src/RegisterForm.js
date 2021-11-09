import { useState} from 'react';
import _ from 'lodash';
import {nanoid} from 'nanoid';

function RegisterForm({ setScreen }) {

  function onClickLogin(evt) {
    console.log('Register Event')
    evt.preventDefault();
    setScreen("Login");
  }

    return (
      <div id="RegisterForm" className="RegisterForm">
        <h1 className="RegisterForm-Header m-3 text-center">Register</h1>
        <form className="RegisterForm-Form m-3">
          <label htmlFor="RegisterForm-GivenName" className="mt-3">Given Name (First Name)</label>
          <input id="RegisterForm-GivenName" className="form-control"/>
          <label htmlFor="RegisterForm-FamilyName" className="mt-3">Family Name (Last Name)</label>
          <input id="RegisterForm-FamilyName" className="form-control"/>
          <label htmlFor="RegisterForm-FullName" className="mt-3">Full Name</label>
          <input id="RegisterForm-FullName" className="form-control"/>
          <label htmlFor="RegisterForm-Email" className="mt-3">Email</label>
          <input id="RegisterForm-Email" className="form-control"/>
          <label htmlFor="RegisterForm-ConfirmEmail" className="mt-3">Confirm Email</label>
          <input id="RegisterForm-ConfirmEmail" className="form-control"/>
          <label htmlFor="RegisterForm-Password" className="mt-3">Password</label>
          <input id="RegisterForm-Password" className="form-control"/>
          <label htmlFor="RegisterForm-ConfirmPassword" className="mt-3">Confirm Password</label>
          <input id="RegisterForm-ConfirmPassword" className="form-control"/>
          <div className="d-flex justify-content-between mt-3">
            <button type="button" className="RegisterForm-Submit btn btn-outline-primary btn-lg">Register</button>
            <div>
              <div>Already Have an Account?</div>
              <div><a href="#LoginForm" onClick={(evt) => onClickLogin(evt)}>Click Here to Sign In</a></div>
            </div>
          </div>
        </form>
      </div>
    );
}

export default RegisterForm;