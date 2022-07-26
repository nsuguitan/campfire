
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Postcard from "../components/Postcard/Postcard";
import searchIcon from "../assets/search.jpg";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [searchImagesArray, setSearchImagesArray] = useState([]);
  const [postSelected, setPostSelected] = useState("");
  const [open, setOpen] = useState(false);
  let { profileUsername } = useParams();

  useEffect(() => {
    async function loadSearchImages() {
      const response = await fetch(
        process.env.REACT_APP_EXPRESS_URL + `/posts/`
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

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(
        process.env.REACT_APP_EXPRESS_URL + `/users/`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      setUsers(await response.json());
    }

    getUsers();
    return;
  }, []);
  console.log(users);

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

  const displaySearchImages = () => {
    return searchImagesArray
      .sort((a, b) => 0.5 - Math.random())
      .map((post) => (
        <Button
          onClick={(event) => handleOpen(event, post._id)}
          key={post._id}
          style={{ padding: "2px" }}
        >
          <img
            src={post.photoURL}
            alt="http://placecorgi.com/250"
            className="searchImage"
          />
        </Button>
      ));
  };

  return (
    <div className="pageContainer">
      <div className="searchHeading">
        <img src={searchIcon} className="searchIcon" />
        <Autocomplete
          disablePortal
          options={users.map((user) => user.username)}
          sx={{ width: 300}}
          renderInput={(params) => <TextField {...params } label="Search"/>}
        />
      </div>
      <div className="searchPhotosGrid">{displaySearchImages()}</div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Button
            variant="text"
            onClick={handleClose}
            style={{
              color: "var(--campfire-white)",
              height: "30px",
              width: "30px",
              zIndex: "3",
              fontSize: "1.7em",
              marginLeft: "500px",
            }}
          >
            X
          </Button>
          <Postcard postId={postSelected} />
        </Box>
      </Modal>
    </div>
  );
};
export default Search;
