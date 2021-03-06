import moment from "moment";
import avatar from './img/avatar.png';

function CommentItem({ comment, auth }) {
  return (
    <div id={`comment-${comment._id}`} className="CommentItem card p-3 bg-dark bg-gradient border-bottom border-light">
      <div>
        <div className="d-flex align-items-center">
          <img src={avatar} alt="PFP" className="avatar" />
          <div className="text-muted ms-3">
            {comment?.author?.fullName ? comment?.author?.fullName : (auth && auth?.fullName)} <span className="me-1"></span>&bull;<span className="ms-1"></span> {moment(comment.dateCreated).fromNow()}
          </div>
        </div>
        <div id={`comment-${comment._id}-title`} className="card-text comment-text text-light"><p className="m-3 mt-1">{comment.comment}</p></div>
      </div>
    </div>
  );
}

export default CommentItem;