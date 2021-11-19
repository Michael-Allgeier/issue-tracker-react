import { Link } from 'react-router-dom';

function BugListItem({ item }) {
  return (
    <div className="card text-dark mt-3">
      <div className="card-body align-items-center">
        <div className="card-title fs-4">
          <Link to={`/bug/${item._id}`}>{item.title}</Link>
        </div>
        <div className="card-text">
          <span className="me-2 badge bg-success">{item.assignedTo.fullName}</span>
          {item.classification === 'Approved' && (
            <span className="me-2 badge bg-success">{item.classification}</span>
          )}
          {item.classification === 'Unapproved' && (
            <span className="me-2 badge bg-danger">{item.classification}</span>
          )}
          {item.classification === 'Duplicate' && (
            <span className="me-2 badge bg-danger">{item.classification}</span>
          )}
          {item.classification === 'Unclassified' && (
            <span className="me-2 badge bg-warning">{item.classification}</span>
          )}
          {item.closed === true && (
            <span className="me-2 badge bg-danger">Closed</span>
          )}
          {item.closed === false && (
            <span className="me-2 badge bg-success">Open</span>
          )}
          {!item.closed && (
            <span className="me-2 badge bg-danger">Open</span>
          )}
        </div>
        <div className="card-footer">
          <span className="me-2 badge bg-success">{item.dateCreated}</span>
          <span className="me-2 badge bg-success">{item.createdBy.fullName}</span>
        </div>
      </div>
    </div>
  );
}

export default BugListItem;