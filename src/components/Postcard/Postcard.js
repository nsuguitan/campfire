import "./Postcard.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardContent, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { InputBase } from "@mui/material";

const Postcard = () => {
  const CardContentNoBottomPadding = styled(CardContent)(
    `
        padding-bottom: 0;
    `
  );

  const comments = [
    { comment: "Who can roast a corgi?", commenter: "Dog lover" },
    {
      comment:
        "It would be cute, if it was a cat. meow meow meow meow meow meow meow meow meow meow",
      commenter: "Cat lover",
    },
  ];
  return (
    <Card sx={{ maxWidth: 540 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
            C
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="CutenessOverload"
      />
      <CardMedia
        component="img"
        height="540px"
        image="http://placecorgi.com/250"
        alt="Puppers"
      />
      <CardActions disableSpacing>
        <IconButton
          sx={{ minHeight: 0, minWidth: 0, padding: 0.5 }}
          aria-label="add comment"
        >
          <FontAwesomeIcon icon={faComment} />
        </IconButton>
        <IconButton
          sx={{ minHeight: 0, minWidth: 0, padding: 0.5 }}
          aria-label="share"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </IconButton>
        <p id="postTime">9 hours ago</p>
      </CardActions>

      <CardContentNoBottomPadding>
        <ul style={{ listStyleType: "none" }}>
          {comments.map((item, i) => (
            <li>
              <div key={i} className="comment-commenter-container">
                <div className="commenter-container">
                  <h4>
                    <span>
                      <a>{item.commenter}</a>
                    </span>
                  </h4>
                </div>
                <div className="comment-container">
                  <span>{item.comment}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContentNoBottomPadding>
      <CardActions>
        <Button
          className="load-comments-button"
          size="medium"
          disableRipple={true}
          variant="text"
          style={{
            backgroundColor: "transparent",
            textTransform: "none",
            color: "#BEBEBE",
          }}
        >
          View all {comments.length} comments
        </Button>
      </CardActions>
      <Paper
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 1 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Add a comment..."
          inputProps={{ "aria-label": "search google maps" }}
        />
        <Button>Post</Button>
      </Paper>
    </Card>
  );
};
export default Postcard;
