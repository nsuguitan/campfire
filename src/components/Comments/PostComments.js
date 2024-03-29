import { CardContent } from "@mui/material";
import styled from "@emotion/styled";
import Comment from "./Comment";
import Rating from "../Rating/rating";
import './Comment.css'
const PostComments = (props) => {
  const CardContentNoBottomPadding = styled(CardContent)(
    `
            padding-bottom: 0;
        `
  );
  return (
    <CardContentNoBottomPadding className='test'>
      <ul style={{ listStyleType: "none" }}>
        {props.postComments.map((item) => (
          <li key={item._id} className='commentLine'>
            <Comment
              commentUsername={item.commentUsername}
              commentText={item.commentText}
            />
            <Rating 
            initialRating={item.commentRating}
            commentId={item._id}
            />
          </li>
        ))}
      </ul>
    </CardContentNoBottomPadding>
  );
};

export default PostComments;
