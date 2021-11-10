
function UserListItem({ user, onEditClick }) {
  return (
    <div id={`user-${user.id}`} className="UserListItem card my-2">
      <div className="d-flex align-items-center">
        <div id={`user-${user.id}-name`} className="card-title fs-3 flex-grow-1 user-name px-2">
          <a href="#EditUser" onClick={(evt) => onEditClick(evt)}>{user.name}</a>
        </div>
        <div id={`user-${user.id}-email`} className="card-text user-email mx-2 text-secondary">{user.email}</div>
        <div id={`user-${user.id}-role`} className="card-text user-role mx-2 text-secondary">{user.role}</div>
        {/* <button id="edit-user-btn" type="button" className="btn btn-sm btn-outline-dark me-2" title="Edit User">
          <i className="fas fa-edit fa-lg"></i>
          <span className="visually-hidden">Edit User</span>
        </button> */}
      </div>
    </div>
  );
}

export default UserListItem;