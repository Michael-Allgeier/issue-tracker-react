import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import BugList from './BugList';
//import BugListItem from './BugListItem';
import BugEditor from './BugEditor';
import UserList from './UserList';
//import UserListItem from './UserListItem';
import UserEditor from './UserEditor';
import { useState } from 'react';

function App() {
  const [screen, setScreen] = useState('EditBug');

  function onClickRegister(evt) {
    evt.preventDefault();
    setScreen("Register");
  }

  function onClickLogin(evt) {
    evt.preventDefault();
    setScreen("Login");
  }

  function onClickBugList(evt) {
    evt.preventDefault();
    setScreen("BugList");
  }

  function onClickUserList(evt) {
    evt.preventDefault();
    setScreen("UserList");
  }

  return <div className="App">
    <nav className="navbar navbar-expand-md navbar-dark position-sticky top-0 start-0 end-0 bg-dark bg-gradient">
      <div className="container-fluid">
        <a className="navbar-brand" href="#Home" onClick={(evt) => onClickLogin(evt)}>Issue Tracker</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#LoginForm" onClick={(evt) => onClickLogin(evt)}>Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#RegisterForm" onClick={(evt) => onClickRegister(evt)}>Register</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#BugList" onClick={(evt) => onClickBugList(evt)}>Bug List</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#UserList" onClick={(evt) => onClickUserList(evt)}>User List</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main>
      <div className="container">
        {screen === 'Login' && <LoginForm setScreen = {setScreen}/>}
        {screen === 'Register' && <RegisterForm setScreen = {setScreen}/>}
        {screen === 'BugList' && <BugList setScreen = {setScreen}/>}
        {screen === 'EditBug' && <BugEditor />}
        {screen === 'UserList' && <UserList setScreen = {setScreen}/>}
        {screen === 'EditUser' && <UserEditor />}
      </div>
    </main>
    <footer className="p-3 text-center bg-dark">&copy; Michael Allgeier 2021</footer>
  </div>
}

export default App;
