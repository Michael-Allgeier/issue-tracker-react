import { nanoid } from "nanoid";
import { useState } from "react";
import _ from "lodash";
import UserListItem from "./UserListItem";

function UserList({ setScreen }) {

  const [users, setUsers] = useState([
    { id: nanoid(), name: "Michael Allgeier", email: "mallgeier2@gmail.com", role: "DEV"},
    { id: nanoid(), name: "Mike Jones", email: "mjones@gmail.com", role: "QA"},
    { id: nanoid(), name: "Adam Smith", email: "asmith@gmail.com", role: "TM"},
  ]);

  function onEditClick(evt) {
    evt.preventDefault();
    setScreen('EditUser');
  }

  return (
    <div className="UserList">
      <h1 className="UserList-Header m-3 text-center">User List</h1>
      <div className="m-3">
        {_.map(users, user => (
          <UserListItem 
            key = {user.id}
            user = {user}
            onEditClick={(evt) => onEditClick(evt)}/>
        ))}
      </div>
    </div>
  );
}

export default UserList;