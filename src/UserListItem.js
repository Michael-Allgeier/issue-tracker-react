import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

function UserListItem({ item }) {

  const roles = item.role;

  return (
    <div className="card text-dark mt-3">
      <div className="card-body align-items-center">
        <div className="card-title fs-4">
          <Link to={`/user/${item._id}`} className="text-black">{item.fullName}</Link>
        </div>
        <div className="card-text">
          <span className="me-2 badge bg-primary">{item.email}</span>
          {!item.role && (<span className="me-2 badge bg-danger">No Role</span>) }
          {_.map(roles, role => (
            <span key={role} value={role} className="me-2 badge bg-primary">{role}</span>
          ))}
        </div>
      </div>
      <div className="card-footer text-center">
        {item.createdOn && (<span>Registered {moment(item.createdOn).fromNow()}</span>)}
      </div>
    </div>
  );
}

export default UserListItem;