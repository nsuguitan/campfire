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
import { Paper } from "@mui/material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PostComments from "../Comments/PostComments";

const Postcard = () => {
  const [newComment, setNewComment] = useState("");
  const [postInfo, setPostInfo] = useState({});
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    //fetch comment that are related to the post in question
    async function getComments() {
      const response = await fetch(`http://localhost:5000/comments/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      setPostComments(await response.json());
    }
    getComments();
  }, [postComments.length]);

  useEffect(() => {
    async function getPostById() {
      const response = await fetch(
        `http://localhost:5000/posts/62af8ef66a57cf6a0f8bcc06`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      setPostInfo(await response.json());
    }

    getPostById();

    return;
  }, []);

  const handleCommentInput = (evt) => {
    setNewComment(evt.target.value);
  };

  const postComment = async () => {
    console.log("posting comment...");
    if (newComment === "") {
      console.log("You can't post nothing dummy");
    } else {
      let loadComment = {
        postId: "62af8ef66a57cf6a0f8bcc06",
        commentText: newComment,
        commentUsername: "Anonymous",
        commentRating: 0,
      };
      console.log("Roasty Toasty Princess says: ", newComment);
      await fetch("http://localhost:5000/comments/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loadComment),
      }).catch((error) => {
        window.alert(error);
        return;
      });

      setNewComment("");
    }
    return;
  };

  // const comments = [
  //   { comment: "Who can roast a corgi?", commenter: "Dog lover" },
  //   {
  //     comment:
  //       "It would be cute, if it was a cat. meow meow meow meow meow meow meow meow meow meow",
  //     commenter: "Cat lover",
  //   },
  // ];
  return (
    <Card sx={{ maxWidth: 540 }} className="fullCard">
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
        image={postInfo.photoURL}
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
      <PostComments postComments={postComments} />
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
          View all {postComments.length} comments
        </Button>
      </CardActions>
      <Paper
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 1 }}
      >
        <TextField
          sx={{ ml: 1, flex: 1 }}
          id="commentTextField"
          placeholder="Add a comment..."
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onChange={handleCommentInput}
          value={newComment}
        />
        <Button onClick={postComment}>Post</Button>
      </Paper>
    </Card>
  );
};
export default Postcard;
