<script src="https://kit.fontawesome.com/e25c005426.js" crossorigin="anonymous"></script>


function BugListItem() {

  return (
    <div className="BugListItem card">
      <div className="d-flex align-items-center">
        <div className="card-title fs-3 flex-grow-1 bug-title px-2">Bug #1</div>
        <div className="card-text bug-author mx-2">Michael Allgeier</div>
        <div className="card-text bug-date-created mx-2">NOV 5, 2021</div>
        <button id="edit-bug-btn" type="button" className="btn btn-sm btn-outline-dark me-2" title="Edit Bug">
          <i className="fas fa-edit fa-lg">Edit</i>
          <span className="visually-hidden">Edit Bug</span>
        </button>
        <button id="add-comment-btn" type="button" className="btn btn-sm btn-outline-dark me-2" title="Add Comment">
          <i className="fas fa-comment fa-lg">Comment</i>
          <span className="visually-hidden">Add Comment</span>
        </button>
      </div>
      <a href="youtube.com" id="view-comments-link" className="card-text px-2 text-center">View Comments</a>
    </div>
  );
}

export default BugListItem;