import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import Postcard from "../components/Postcard/Postcard";
import searchIcon from '../assets/searchIcon.jpg';

const Search = () => {
  const [searchImagesArray, setSearchImagesArray] = useState([]);
  const [postSelected, setPostSelected] = useState("");
  const [open, setOpen] = useState(false);
  let { profileUsername } = useParams();

  useEffect(() => {
    async function loadSearchImages() {
      const response = await fetch(
        `http://localhost:5000/posts/`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      setSearchImagesArray(await response.json());
    }
    loadSearchImages();
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

  const displaySearchImages = () => {
    return searchImagesArray.sort((a,b) => .5 -Math.random())
      .map((post) => (
          <Button
            onClick={(event) => handleOpen(event, post._id)}
            key={post._id}
            style={{padding: '2px'}}
          >
            <img
              src={post.photoURL}
              alt="http://placecorgi.com/250"
              className="searchImage"
            />
          </Button>
      ))
  };

    return (
      <div className='pageContainer'>
        <div className='searchHeading'>
          <img src={searchIcon} className='searchIcon'/>
          <input className='sarchBar'></input>
        </div>
        <div className='searchPhotosGrid'>{displaySearchImages()}</div>
        <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Postcard postId={postSelected} />
        </Box>
      </Modal>
      </div>
    );
  };
  export default Search;




  