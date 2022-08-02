import { useEffect, useState } from "react";
import { Button, Modal, Box, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Postcard from "../components/Postcard/Postcard";
import searchIcon from "../assets/search.jpg";
import { useNavigate, Routes, Route } from "react-router-dom";
import './Search.css'

const Search = () => {
  const [users, setUsers] = useState([]);
  const [searchImagesArray, setSearchImagesArray] = useState([]);
  const [postSelected, setPostSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  let navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    boxShadow: 24,
    p: 4,
  };

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

      setSearchImagesArray(
        (await response.json()).sort((a, b) => 0.5 - Math.random())
      );
    }
    loadSearchImages();
  }, []);

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

  const handleOpen = (event, postId) => {
    event.preventDefault();
    setPostSelected(postId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchUserInput = (evt) => {
    setSearchUser(evt.target.value);
  };

  const routeChange = () => {
    let usernames = users.map((a) => a.username);
    if (usernames.includes(searchUser)) navigate(`/Profile/${searchUser}`);
  };

  return (
    <div className="pageContainer">
      <div className="searchHeading">
        <img src={searchIcon} alt="search" className="searchIcon" />
        <Autocomplete
          clearOnEscape
          options={users.map((user) => user.username)}
          sx={{ width: 300, "& input": { color: "var(--campfire-white)" } }}
          onChange={(event, value) => setSearchUser(value)}
          PaperComponent={({ children }) => (
            <Paper style={{ background: "var(--campfire-dark-gray)" }}>
              {children}
            </Paper>
          )}
          onUpdateInput={handleSearchUserInput}
          renderInput={(params) => (
            <TextField
              // to="/Profile/${user.username}"
              {...params}
              InputLabelProps={{
                style: { color: "var(--campfire-white)" },
              }}
              onChange={handleSearchUserInput}
              label="Search"
            />
          )}
        />
        <Button onClick={routeChange}>Go</Button>
      </div>
      <div className="searchPhotosGrid" id="seachPhotosGrid">
        {searchImagesArray.map((post) => (
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
        ))}
      </div>
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
