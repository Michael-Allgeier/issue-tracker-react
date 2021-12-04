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
        <div>
          <div className="me-2 badge bg-primary card-text fs-6">{item.email}</div>
          {(!item.role || (_.isArray(roles) && _.isEmpty(roles))) && (<div className="me-2 badge bg-danger card-text fs-6">No Role</div>) }
          {_.map(roles, role => (
            <div key={role} value={role} className="me-2 badge bg-secondary card-text fs-6">{role}</div>
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