import { CardContent } from "@mui/material";
import styled from "@emotion/styled";
const PostComments = () => {
  const CardContentNoBottomPadding = styled(CardContent)(
    `
            padding-bottom: 0;
        `
  );
  return (
    <CardContentNoBottomPadding>
      <ul style={{ listStyleType: "none" }}>
        {comments.map((item, i) => (
          <li key={i}></li>
        ))}
      </ul>
    </CardContentNoBottomPadding>
  );
};

export default PostComments;
