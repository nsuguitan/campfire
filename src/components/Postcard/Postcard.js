import "./Postcard.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { List, ListItem, ListItemText } from "@mui/material";
import { red } from "@mui/material/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardContent } from "@mui/material";
import styled from "@emotion/styled";

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
        <IconButton aria-label="add to favorites">
          <FontAwesomeIcon icon={faComment} />
        </IconButton>
        <IconButton aria-label="share">
          <FontAwesomeIcon icon={faPaperPlane} />
        </IconButton>
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
    </Card>
  );
};
export default Postcard;
