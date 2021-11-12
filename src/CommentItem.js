function CommentItem({ comment }) {
  return (
    <div id={`comment-${comment.id}`} className="CommentItem card my-2">
      <div>
        <div id={`comment-${comment.id}-title`} className="card-text comment-text px-2 text-dark">{comment.comment}</div>
        <div className="text-muted mx-2">
          {comment.author} on {comment.dateCreated}
          {/* <div id={`comment-${comment.id}-author`} className="card-text comment-author text-secondary">By {comment.author} On {comment.dateCreated}</div> */}
          {/* <div className="test-case-dot-icon"><i class="fas fa-circle fa-xs text-secondary"/></div> */}
          {/* <div id={`comment-${comment.id}-date-created`} className="card-text comment-date-created text-secondary"> On {comment.dateCreated}</div> */}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;