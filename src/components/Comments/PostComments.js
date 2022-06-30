import { CardContent } from "@mui/material";
import styled from "@emotion/styled";
import Comment from "./Comment";
const PostComments = (props) => {
  const CardContentNoBottomPadding = styled(CardContent)(
    `
            padding-bottom: 0;
        `
  );
  console.log("Comments: ", props.postComments);
  return (
    <CardContentNoBottomPadding>
      <ul style={{ listStyleType: "none" }}>
        {props.postComments.map((item) => (
          <li key={item._id}>
            <Comment
              commentUsername={item.commentUsername}
              commentText={item.commentText}
            />
          </li>
        ))}
      </ul>
    </CardContentNoBottomPadding>
  );
};

export default PostComments;
