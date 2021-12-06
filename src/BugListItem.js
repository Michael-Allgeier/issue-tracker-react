import { Link } from 'react-router-dom';
import moment from 'moment';

function BugListItem({ item }) {
  return (
    <Link to={`/bug/${item._id}`} className="text-light text-decoration-none">
      <div className="BugListItem card bg-dark">
        <div className="card-body align-items-center">
          <div className="card-title fs-4">{item.title}</div>
          <div className="card-text">
            {item.assignedTo ? (
              <span className="me-2 badge bg-success fs-6 mt-2 border border-light">{item.assignedTo.fullName}</span>
            ) : item.assignedToUserName ? (
              <span className="me-2 badge bg-success fs-6 mt-2 border border-light">{item.assignedToUserName}</span>
            ) : (
              <span className="me-2 badge bg-danger fs-6 mt-2 border border-light">No User Assigned</span>
            )}
            {item.classification === 'Approved' && <span className="me-2 badge bg-success fs-6 mt-2 border border-light">{item.classification}</span>}
            {item.classification === 'Unapproved' && <span className="me-2 badge bg-danger fs-6 mt-2 border border-light">{item.classification}</span>}
            {item.classification === 'Duplicate' && <span className="me-2 badge bg-danger fs-6 mt-2 border border-light">{item.classification}</span>}
            {item.classification === 'Unclassified' && (
              <span className="me-2 badge bg-warning fs-6 mt-2 border border-light">{item.classification}</span>
            )}
          </div>
        </div>
        <div className="card-footer bg-dark bg-gradient text-center d-flex justify-content-between">
          <span>
            {item.createdOn && <span className="">Created {moment(item.createdOn).fromNow()}</span>}
            {item.dateCreated && <span className="">Created {moment(item.dateCreated).fromNow()}</span>}
            {item?.createdBy?.fullName ? <span> By {item.createdBy.fullName}</span> : <span> by {item?.createdBy?.email}</span>}
          </span>
          <span>
            {item.closed === true ? (
              <span className="me-2 badge bg-danger border border-light">Closed</span>
              ) : (
              <span className="me-2 badge bg-success border border-light">Open</span>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default BugListItem;
