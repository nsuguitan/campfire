import "./Postcard.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "../Avatar/Avatar";
import { Button, Modal, Box } from "@mui/material";
import { Paper } from "@mui/material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PostComments from "../Comments/PostComments";
import PostInfo from "../PostInfo/PostInfo";
import { AuthState } from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";
import { DeletePostMenu } from "./DeletePostMenu";

const Postcard = (props) => {
  const [newComment, setNewComment] = useState("");
  const [postInfo, setPostInfo] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postSelected, setPostSelected] = useState("");
  const [open, setOpen] = useState(false);
  const { username } = AuthState();

  useEffect(() => {
    if (JSON.stringify(postInfo) !== JSON.stringify({})) {
      setIsLoading(false);
    }
  }, [postInfo]);

  useEffect(() => {
    //fetch comment that are related to the post in question
    async function getComments() {
      const response = await fetch(
        process.env.REACT_APP_EXPRESS_URL + `/comments/post/${props.postId}`
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
        process.env.REACT_APP_EXPRESS_URL + `/posts/${props.postId}`
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
    if (newComment === "") {
    } else {
      let loadComment = {
        postId: props.postId,
        commentText: newComment,
        commentUsername: username,
        commentRating: 0,
      };
      await fetch(process.env.REACT_APP_EXPRESS_URL + `/comments/add`, {
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = (event, postId) => {
    event.preventDefault();
    setPostSelected(postId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Card
          sx={{ maxWidth: 540, backgroundColor: "#28292b" }}
          className="fullCard"
        >
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
              <DeletePostMenu
                postUsername={postInfo.author.username}
                postId={postInfo._id}
                postPhotoURL={postInfo.photoURL}
              />
            }
            title={
              <Link
                to={`/Profile/${postInfo.author.username}`}
                style={{
                  textDecoration: "none",
                  color: "var(--campfire-white)",
                  fontWeight: "bold",
                  fontSize: "17.5px",
                  textShadow: "1px 1px black",
                }}
              >
                {postInfo.author.username}
              </Link>
            }
            style={{ backgroundColor: "var(--campfire-dark-gray)" }}
          />
          <CardMedia
            component="img"
            height="540px"
            image={postInfo.photoURL}
            alt="Puppers"
            className="singleCardMedia"
          />
          <PostInfo postDate={postInfo.postDate} />
          <PostComments postComments={postComments} />
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 1,
              backgroundColor: "#28292b",
              color: "white",
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

            <Button
              onClick={postComment}
              style={{
                color: "var(--campfire-white)",
                backgroundColor: "var(--campfire-orange",
                margin: "10px",
              }}
            >
              Post
            </Button>
          </Paper>
        </Card>
      )}
    </div>
  );
};
export default Postcard;
