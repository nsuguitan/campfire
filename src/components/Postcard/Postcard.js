import "./Postcard.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "../Avatar/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Paper } from "@mui/material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PostComments from "../Comments/PostComments";
import PostInfo from "../PostInfo/PostInfo";

const Postcard = (props) => {
  const [newComment, setNewComment] = useState("");
  const [postInfo, setPostInfo] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Props: ", props.postId);
    if (JSON.stringify(postInfo) !== JSON.stringify({})) {
      setIsLoading(false);
    }
  }, [postInfo]);

  useEffect(() => {
    //fetch comment that are related to the post in question
    async function getComments() {
      const response = await fetch(
        `http://localhost:5000/comments/post/${props.postId}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      setPostComments(await response.json());
    }
    getComments();
  }, []);

  useEffect(() => {
    async function getPostById() {
      const response = await fetch(
        `http://localhost:5000/posts/${props.postId}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      setPostInfo(await response.json());
      console.log(postInfo);
    }

    getPostById();

    return;
  }, []);

  const handleCommentInput = (evt) => {
    setNewComment(evt.target.value);
  };

  const postComment = async () => {
    if (newComment === "") {
    } else {
      let loadComment = {
        postId: props.postId,
        commentText: newComment,
        commentUsername: "Anonymous",
        commentRating: 0,
      };
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
      setPostComments((current) => [...current, loadComment]);
    }
    return;
  };

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Card sx={{ maxWidth: 540 }} className="fullCard">
          <CardHeader
            avatar={
              <Avatar
                borderRadius="50%"
                height="50px"
                width="50px"
                profilepic={postInfo.author.profilePicURL}
              />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={postInfo.author.username}
          />
          <CardMedia
            component="img"
            height="540px"
            image={postInfo.photoURL}
            alt="Puppers"
          />
          <PostInfo />
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
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 1,
            }}
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
      )}
    </div>
  );
};
export default Postcard;
