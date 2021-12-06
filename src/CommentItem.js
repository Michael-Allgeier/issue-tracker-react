import moment from "moment";
import avatar from './img/avatar.png';

function CommentItem({ comment, auth }) {
  return (
    <div id={`comment-${comment._id}`} className="CommentItem card p-3 bg-dark bg-gradient">
      <div>
        <div className="d-flex align-items-center">
          <img src={avatar} alt="PFP" className="avatar" />
          <div className="text-muted ms-3">
            {/* {comment.author.fullName ? comment.author.fullName : comment.author} &bull; {moment(comment.dateCreated).fromNow()} */}
            {comment?.author?.fullName ? comment?.author?.fullName : (auth && auth?.fullName)} &bull; {moment(comment.dateCreated).fromNow()}
            {/* <div id={`comment-${comment.id}-author`} className="card-text comment-author text-secondary">By {comment.author} On {comment.dateCreated}</div> */}
            {/* <div className="test-case-dot-icon"><i class="fas fa-circle fa-xs text-secondary"/></div> */}
            {/* <div id={`comment-${comment.id}-date-created`} className="card-text comment-date-created text-secondary"> On {comment.dateCreated}</div> */}
          </div>
        </div>
        <div id={`comment-${comment._id}-title`} className="card-text comment-text text-light"><p className="me-3 mt-1">{comment.comment}</p></div>
      </div>
    </div>
  );
}

export default CommentItem;