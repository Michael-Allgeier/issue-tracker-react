function CommentItem({ comment }) {
  return (
    <div id={`comment-${comment.id}`} className="CommentItem card my-2">
      <div className="d-flex align-items-center">
        <div id={`comment-${comment.id}-title`} className="card-text fs-5 flex-grow-1 comment-text px-2 text-dark">{comment.comment}</div>
        <div id={`comment-${comment.id}-author`} className="card-text comment-author mx-2 text-secondary">{comment.author}</div>
        <div id={`comment-${comment.id}-date-created`} className="card-text comment-date-created mx-2 text-secondary">{comment.dateCreated}</div>
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

export default CommentItem;