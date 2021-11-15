
function LoginForm({ setScreen }) {

  function onClickRegister(evt) {
    console.log('Register Event')
    evt.preventDefault();
    setScreen("Register");
  }

  return (
    <div id="LoginForm" className="LoginForm">
      <h1 className="LoginForm-Header m-3 text-center">Login</h1>
      <form className="LoginForm-Form m-3 p-3">
        <label htmlFor="LoginForm-Email" className="mt-3">Email</label>
        <input id="LoginForm-Email" className="form-control"/>
        <label htmlFor="LoginForm-Password" className="mt-3">Password</label>
        <input id="LoginForm-Password" className="form-control"/>
        <div className="d-flex justify-content-between mt-3">
          <button type="button" className="LoginForm-Submit btn btn-success btn-lg">Login</button>
          <div>
            <div>Don't Have an Account?</div>
            <div><a id="LoginForm-Register" href="#RegisterForm" onClick={(evt) => onClickRegister(evt)}>Click Here to Register</a></div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;