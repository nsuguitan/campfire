import Rating from "../Rating/rating";
const Comment = (props) => {
  return (
    <div className="list-comments-container">
      <div className="comment-commenter-container">
        <div className="commenter-container">
          <h4>
            <span>
              <a>{props.commenter}</a>
            </span>
          </h4>
        </div>
        <div className="comment-container">
          <span>{props.comment}</span>
        </div>
      </div>
      <Rating />
    </div>
  );
};
export default Comment;
