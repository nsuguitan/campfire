import { useParams } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";
import { useEffect, useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import Postcard from "../components/Postcard/Postcard";
import '../components/ProfileInfo/ProfileInfo.css'

const Profile = () => {
  const [profileImagesArray, setProfileImagesArray] = useState([]);
  const [postSelected, setPostSelected] = useState("");
  const [open, setOpen] = useState(false);
  let { profileUsername } = useParams();

  useEffect(() => {
    async function loadProfileImages() {
      const response = await fetch(
        process.env.REACT_APP_EXPRESS_URL + `/posts/user/${profileUsername}`
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
    boxShadow: 24,
    p: 4,
  };

  const displayProfileImages = () => {
    return profileImagesArray
      .map((post) => (
        <Button onClick={(event) => handleOpen(event, post._id)} key={post._id}>
          <img
            src={post.photoURL}
            alt="http://placecorgi.com/250"
            className="singleGridPhoto"
          />
        </Button>
      ))
      .reverse();
  };

  return (
    <div className="pageContainer">
      <br />
      <ProfileInfo
        profileUsername={profileUsername}
        postCount={profileImagesArray.length}
      />
      <div className="imageGridContainer">{displayProfileImages()}</div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Button variant='text' onClick={handleClose} style={{ color: 'var(--campfire-white)', height: '30px', width: '30px', zIndex: '3', fontSize: '1.7em', marginLeft: '500px' }}>X</Button>
          <Postcard postId={postSelected} />
        </Box>
      </Modal>
    </div>
  );
};
export default Profile;
