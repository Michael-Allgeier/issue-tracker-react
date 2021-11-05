import UserListItem from "./UserListItem";

function UserList() {

  return (
    <div className="UserList">
      <h1 className="UserList-Header m-3 text-center">Bug List</h1>
      <div className="m-3">
        <UserListItem/>
      </div>
    </div>
  );
}

export default UserList;