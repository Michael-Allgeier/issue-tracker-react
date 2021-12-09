import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

function UserListItem({ item }) {

  const roles = item.role;

  return (
    <Link to={`/user/${item._id}`} className="text-light text-decoration-none">
      <div className="UserListItem card bg-dark border-bottom border-light">
        <div className="card-body align-items-center">
          <div className="card-title fs-4">{item.fullName}</div>
          <div>
            <div>
              {(!item.role || (_.isArray(roles) && _.isEmpty(roles))) && (<div className="me-2 badge bg-danger card-text fs-6 mt-1 border border-light text-dark">No Role</div>) }
              {_.map(roles, role => (
                <div key={role} value={role} className="me-2 badge bg-light card-text fs-6 mt-1 border border-light text-dark">{role}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="card-footer bg-dark bg-gradient d-flex justify-content-between">
          {item.createdOn && (<div>Registered {moment(item.createdOn).fromNow()}</div>)}
          <div>
            <div className="badge bg-primary border border-light text-dark fs-6">{item.email}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserListItem;