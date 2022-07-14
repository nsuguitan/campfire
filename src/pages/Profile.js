import { useParams } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";
import { useEffect, useState } from "react";
//import { AuthState } from "../context/auth/AuthContext";
import { Button, Modal, Box } from "@mui/material";
import Postcard from "../components/Postcard/Postcard";
const Profile = () => {
  const [profileImagesArray, setProfileImagesArray] = useState([]);
  const [postSelected, setPostSelected] = useState("");
  const [open, setOpen] = useState(false);
  //const { username } = AuthState();
  let { profileUsername } = useParams();

  useEffect(() => {
    async function loadProfileImages() {
      const response = await fetch(
        `http://localhost:5000/posts/user/${profileUsername}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      setProfileImagesArray(await response.json());
    }
    loadProfileImages();
  }, [profileUsername]);

  const handleOpen = (event, postId) => {
    event.preventDefault();
    setPostSelected(postId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const displayProfileImages = () => {
    return profileImagesArray
      .map((post) => (
        <div className="profileImageButton">
          <Button
            onClick={(event) => handleOpen(event, post._id)}
            key={post._id}
          >
            <img
              src={post.photoURL}
              alt="http://placecorgi.com/250"
              className="singleGridPhoto"
            />
          </Button>
        </div>
      ))
      .reverse();
  };
  return (
    <div className="pageContainer">
      <br />
      <ProfileInfo profileUsername={profileUsername} />
      <div className="imageGridContainer">{displayProfileImages()}</div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Postcard postId={postSelected} />
        </Box>
      </Modal>
    </div>
  );
};
export default Profile;
