import { Link } from 'react-router-dom';
import moment from 'moment';

function BugListItem({ item }) {
  return (
    <div className="card text-dark mt-3">
      <div className="card-body align-items-center">
        <div className="card-title fs-4">
          <Link to={`/bug/${item._id}`} className="text-black">{item.title}</Link>
        </div>
        <div className="card-text">
          {item.assignedTo ? (
            <span className="me-2 badge bg-success fs-6 mt-2">{item.assignedTo.fullName}</span>
          ) : item.assignedToUserName ? (
            <span className="me-2 badge bg-success fs-6 mt-2">{item.assignedToUserName}</span>
          ) : (
            <span className="me-2 badge bg-danger fs-6 mt-2">No User Assigned</span>
          )}
          {item.classification === 'Approved' && <span className="me-2 badge bg-success fs-6 mt-2">{item.classification}</span>}
          {item.classification === 'Unapproved' && <span className="me-2 badge bg-danger fs-6 mt-2">{item.classification}</span>}
          {item.classification === 'Duplicate' && <span className="me-2 badge bg-danger fs-6 mt-2">{item.classification}</span>}
          {item.classification === 'Unclassified' && (
            <span className="me-2 badge bg-warning fs-6 mt-2">{item.classification}</span>
          )}
          {item.closed === true ? (
            <span className="me-2 badge bg-danger fs-6 mt-2">Closed</span>
          ) : (
            <span className="me-2 badge bg-success fs-6 mt-2">Open</span>
          )}
        </div>
      </div>
      <div className="card-footer text-center">
          {item.createdOn && <span className="">{moment(item.createdOn).fromNow()}</span>}
          {item.dateCreated && <span className="">{moment(item.dateCreated).fromNow()}</span>}
          {item?.createdBy?.fullName ? <span> by {item.createdBy.fullName}</span> : <span> by {item?.createdBy?.email}</span>}
        </div>
    </div>
  );
}

export default BugListItem;
