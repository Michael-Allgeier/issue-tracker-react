import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import BugList from './BugList';
import BugEditor from './BugEditor';
import ReportBug from './ReportBug';
import UserList from './UserList';
import UserEditor from './UserEditor';
import SelfEditor from './SelfEditor';
import TestCaseEditor from './TestCaseEditor';
import Navbar from './Navbar';
import NotFound  from './NotFound';
import Footer from './Footer';
import jwt from 'jsonwebtoken';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

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
            userId: authPayload._id,
            fullName: authPayload.fullName,
            role: authPayload.role,
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

  function onRegister(auth) {
    setAuth(auth);
    navigate('/user/me');
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
    toast(message, {type: 'error', position: 'bottom-right'});
  }

  function showSuccess(message) {
    toast(message, {type: 'success', position: 'bottom-right'});
  }

  return (
  <div className="App min-vh-100 d-flex flex-column">
    <Navbar auth={auth} onLogout={onLogout}/>
    <div className="flex-grow-1">
      <ToastContainer />
      <main className="container my-5">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm onLogin={onLogin} showError={showError} /> } />
          <Route path="/register" element={<RegisterForm onRegister={onRegister} showError={showError} showSuccess={showSuccess}/> } />
          <Route path="/bug/list" element={<BugList auth={auth} showError={showError} showSuccess={showSuccess}/> } />
          <Route path="/bug/:bugId" element={<BugEditor auth={auth} showError={showError} showSuccess={showSuccess}/> } />
          <Route path="/user/list" element={<UserList auth={auth} showError={showError} showSuccess={showSuccess}/> } />
          <Route path="/user/me" element={<SelfEditor auth={auth} showError={showError} showSuccess={showSuccess}/>} />
          <Route path="/user/:userId" element={<UserEditor auth={auth} showError={showError} showSuccess={showSuccess}/> } />
          <Route path="/bug/:bugId/test/:testId" element={<TestCaseEditor auth={auth} showError={showError} showSuccess={showSuccess}/>} />
          <Route path="/bug/report" element={<ReportBug auth={auth} showError={showError} showSuccess={showSuccess}/>} />
          <Route path="*" element={<NotFound/> } />
        </Routes>
      </main>
    </div>
    <Footer />
  </div>
  );
}

export default App;
