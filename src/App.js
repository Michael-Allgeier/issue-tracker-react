import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import BugList from './BugList';
//import BugListItem from './BugListItem';
import BugEditor from './BugEditor';
import UserList from './UserList';
//import UserListItem from './UserListItem';
import UserEditor from './UserEditor';
import Navbar from './Navbar';
import NotFound  from './NotFound';
import Footer from './Footer';
import jwt from 'jsonwebtoken';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  // function onClickRegister(evt) {
  //   evt.preventDefault();
  //   setScreen("Register");
  // }

  useEffect(() => {
    if (localStorage) {
      const storedAuthToken = localStorage.getItem('authToken');
      if (storedAuthToken) {
        const authPayload = jwt.decode(storedAuthToken);
        if (authPayload) {
          const auth = {
            token: storedAuthToken,
            payload: authPayload,
            email: authPayload.email,
            userId: authPayload._id
          };
          setAuth(auth);
        }
      }
    }
  }, []);

  function onLogin(auth) {
    setAuth(auth);
    navigate('/bug/list');
    showSuccess('Logged In!');
    if (localStorage) {
      localStorage.setItem('authToken', auth.token);
    }
  }

  function onLogout() {
    setAuth(null);
    navigate('/login');
    showSuccess('Logged Out!');
    if (localStorage) {
      localStorage.removeItem('authToken');
    }
  }

  function showError(message) {
    toast(message, {type: 'error', position: 'top-right'});
  }

  function showSuccess(message) {
    toast(message, {type: 'success', position: 'top-right'});
  }

  // function onClickBugList(evt) {
  //   evt.preventDefault();
  //   setScreen("BugList");
  // }

  // function onClickUserList(evt) {
  //   evt.preventDefault();
  //   setScreen("UserList");
  // }

  return (
  <div className="App min-vh-100 d-flex flex-column">
    <Navbar auth={auth} onLogout={onLogout}/>
    <div className="flex-grow-1">
      <ToastContainer />
      <main className="container my-5">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm onLogin={onLogin} showError={showError} /> } />
          <Route path="/register" element={<RegisterForm onLogin={onLogin} showError={showError}/> } />
          <Route path="/bug/list" element={<BugList auth={auth} showError={showError} showSuccess={showSuccess}/> } />
          <Route path="/bug/:bugId" element={<BugEditor auth={auth} showError={showError} showSuccess={showSuccess}/> } />
          <Route path="/user/list" element={<UserList auth={auth} showError={showError} showSuccess={showSuccess}/> } />
          <Route path="/user/:userId" element={<UserEditor auth={auth} showError={showError} showSuccess={showSuccess}/> } />
          <Route path="*" element={<NotFound/> } />
        </Routes>
      </main>
    </div>
    <Footer />
  </div>
  );
}

export default App;
