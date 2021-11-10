
function BugListItem({ bug, onEditClick }) {

  return (
    <div id={`bug-${bug.id}`} className="BugListItem card my-2">
      <div className="d-flex align-items-center">
        <div id={`bug-${bug.id}-title`} className="card-title fs-3 flex-grow-1 bug-title px-2">
          <a href="#EditBug" onClick={(evt) => onEditClick(evt)}>{bug.title}</a>
        </div>
        <div id={`bug-${bug.id}-author`} className="card-text bug-author mx-2 text-secondary">{bug.author}</div>
        <div id={`bug-${bug.id}-date-created`} className="card-text bug-date-created mx-2 text-secondary">{bug.dateCreated}</div>
        {/* <button 
          id="edit-bug-btn" 
          type="button" 
          className="btn btn-sm btn-outline-dark me-2" 
          title="Edit Bug"
          onClick={(evt) => onEditClick(evt)}>
          <i className="fas fa-edit fa-lg"></i>
          <span className="visually-hidden">Edit Bug</span>
        </button> */}
      </div>
    </div>
  );
}

export default BugListItem;