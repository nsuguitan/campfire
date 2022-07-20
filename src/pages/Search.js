import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import Postcard from "../components/Postcard/Postcard";

import searchImage1 from '../assets/search1.jpg';
import searchImage2 from '../assets/search2.jpg';
import searchImage3 from '../assets/search3.jpg';
import searchImage4 from '../assets/search4.jpg';
import searchImage5 from '../assets/search5.jpg';
import searchImage6 from '../assets/search6.jpg';
import searchImage7 from '../assets/search7.jpg';
import searchImage8 from '../assets/search8.jpg';
import searchImage9 from '../assets/search9.jpg';
import searchImage10 from '../assets/search10.jpg';
import searchImage11 from '../assets/search11.jpg';
import searchImage12 from '../assets/search12.jpg';
import searchImage13 from '../assets/search13.jpg';
import searchImage14 from '../assets/search14.jpg';
import searchImage15 from '../assets/search15.jpg';
import searchImage16 from '../assets/search16.jpg';
import searchIcon from '../assets/searchIcon.jpg';

const Search = () => {
  const [searchImagesArray, setSearchImagesArray] = useState([]);
  const [postSelected, setPostSelected] = useState("");
  const [open, setOpen] = useState(false);
  let { profileUsername } = useParams();

  useEffect(() => {
    async function loadSearchImages() {
      const response = await fetch(
        `http://localhost:5000/posts/user/${profileUsername}`
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
    return searchImagesArray
      .map((post) => (
        <div className="searchImageButton">
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
      <div className='pageContainer'>
        <div className='searchHeading'>
          <img src={searchIcon} className='searchIcon'/>
          <input className='sarchBar'></input>
        </div>
        <div className='searchPhotosGrid'>
          {displaySearchImages()}
        </div>
      </div>
    );
  };
  export default Search;




  