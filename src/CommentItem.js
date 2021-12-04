import moment from "moment";
import avatar from './img/avatar.png';

function CommentItem({ comment }) {
  return (
    <div id={`comment-${comment._id}`} className="CommentItem card py-3">
      <div className="mb-2">
        <span>
          <img src={avatar} alt="PFP" className="avatar" />
        </span>
        <span id={`comment-${comment._id}-title`} className="card-text comment-text text-dark"><p className="me-3">{comment.comment}</p></span>
      </div>
      <div>
        <div className="text-muted">
          {comment.author.fullName ? comment.author.fullName : comment.author} &bull; {moment(comment.dateCreated).fromNow()}
          {/* <div id={`comment-${comment.id}-author`} className="card-text comment-author text-secondary">By {comment.author} On {comment.dateCreated}</div> */}
          {/* <div className="test-case-dot-icon"><i class="fas fa-circle fa-xs text-secondary"/></div> */}
          {/* <div id={`comment-${comment.id}-date-created`} className="card-text comment-date-created text-secondary"> On {comment.dateCreated}</div> */}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;