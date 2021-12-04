import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

function UserListItem({ item }) {

  const roles = item.role;

  return (
    <div className="UserListItem card text-dark">
      <div className="card-body align-items-center">
        <div className="card-title fs-4">
          <Link to={`/user/${item._id}`} className="text-black">{item.fullName}</Link>
        </div>
        <div>
          <div>
            {(!item.role || (_.isArray(roles) && _.isEmpty(roles))) && (<div className="me-2 badge bg-danger card-text fs-6 mt-1">No Role</div>) }
            {_.map(roles, role => (
              <div key={role} value={role} className="me-2 badge bg-secondary card-text fs-6 mt-1">{role}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between">
        {item.createdOn && (<div>Registered {moment(item.createdOn).fromNow()}</div>)}
        <div>
          <div className="badge bg-primary">{item.email}</div>
        </div>
      </div>
    </div>
  );
}

export default UserListItem;