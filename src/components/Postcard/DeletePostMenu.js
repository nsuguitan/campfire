import * as React from "react";
import { IconButton, Menu, Modal, Box, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AuthState } from "../../context/auth/AuthContext";
import { useState } from "react";
import {
  deleteComments,
  deletePost,
  deleteImage,
} from "../../services/DeleteInfo";
import { useNavigate, useLocation } from "react-router-dom";

export const DeletePostMenu = (props) => {
  const { username } = AuthState();
  const isUserPost = Boolean(props.postUsername === username);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const open = Boolean(anchorEl);

  let navigate = useNavigate();
  const location = useLocation();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    textAlign: "center",
    display: "grid",
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const deletePostInfo = () => {
    let dp = deletePost(props.postId);
    let dc = deleteComments(props.postId);
    let filename = /[^/]*$/.exec(props.postPhotoURL)[0];
    let di = deleteImage(filename);
    Promise.all([dp, dc, di]).then((values) => {
      let redirect = location.pathname;
      navigate("/Loading");
      setTimeout(() => {
        navigate(redirect);
      }, 100);
    });
  };

  return (
    <div>
      {isUserPost ? (
        <IconButton
          aria-label="settings"
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      ) : (
        <IconButton disabled>
          <MoreVertIcon />
        </IconButton>
      )}
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            setModalOpen(true);
            handleMenuClose();
          }}
        >
          Delete Post
        </MenuItem>
      </Menu>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={{ ...style }}>
          <Button
            variant="text"
            onClick={handleModalClose}
            style={{
              color: "black",
              height: "30px",
              width: "30px",
              zIndex: "3",
              fontSize: "1.7em",
              marginLeft: "380px",
              marginTop: "20px",
            }}
          >
            X
          </Button>
          <h3>Are you sure you want to delete this post?</h3>
          <Button onClick={deletePostInfo}>Delete now</Button>
        </Box>
      </Modal>
    </div>
  );
};
