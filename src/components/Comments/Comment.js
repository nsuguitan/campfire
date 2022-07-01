import Rating from "../Rating/rating";
import "./Comment.css";
const Comment = (props) => {
  return (
    <div className="list-comments-container">
      <div className="comment-commenter-container">
        <div className="commenter-container">
          <h4>
            <span>{props.commentUsername}</span>
          </h4>
        </div>
        <div className="comment-container">
          <span>{props.commentText}</span>
        </div>
      </div>
    </div>
  );
};
export default Comment;
