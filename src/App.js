import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import BugList from './BugList';
import BugListItem from './BugListItem';
import BugSummary from './BugSummary';
import BugEditor from './BugEditor';
import UserList from './UserList';
import UserListItem from './UserListItem';
import UserSummary from './UserSummary';
import UserEditor from './UserEditor';
import { useState } from 'react';

function App() {
  const [screen, setScreen] = useState('UserList');

  return <div className="App container">
    <nav></nav>
    {screen === 'Login' && <LoginForm setScreen = {setScreen}/>}
    {screen === 'Register' && <RegisterForm setScreen = {setScreen}/>}
    {screen === 'BugList' && <BugList setScreen = {setScreen}/>}
    {screen === 'EditBug' && <BugEditor />}
    {screen === 'UserList' && <UserList setScreen = {setScreen}/>}
    {screen === 'EditUser' && <UserEditor />}
    </div>;
}

export default App;
