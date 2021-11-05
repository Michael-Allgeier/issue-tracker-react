
function UserListItem() {
  return (
    <div className="UserListItem card">
      <div className="d-flex align-items-center">
        <div className="card-title fs-3 flex-grow-1 user-name px-2">Michael Allgeier</div>
        <div className="card-text user-email mx-2">michael_allgeier@insideranken.org</div>
        <div className="card-text user-role mx-2">DEV</div>
        <button id="edit-user-btn" type="button" className="btn btn-sm btn-outline-dark me-2" title="Edit User">
          <i className="fas fa-edit fa-lg">Edit</i>
          <span className="visually-hidden">Edit User</span>
        </button>
      </div>
    </div>
  );
}

export default UserListItem;