import { Link } from "react-router-dom";
import * as React from "react";
import { Button } from "react-bootstrap";
import "./NavBar.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useState } from "react";
import NewPost from "../NewPost/NewPost";
import { AuthState } from "../../context/auth/AuthContext";
import Home from "../../assets/home.jpg";
import Search from "../../assets/search.jpg";
import addImage from "../../assets/addPost.jpg";
import Logout from "../../assets/logout.jpg";
import Profile from "../../assets/profile.jpg";
import Logo from "../../assets/logo.jpg";
import Hamburger from "../../assets/hamburger.jpg";

const NavBar = () => {
  const { isAuthenticated, username, logout } = AuthState();
  let [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const triggerLogout = async (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <div
      className="navContainer"
      style={isAuthenticated ? { display: "flex" } : { display: "none" }}
    >
      <div className="navCol1">
        <img src={Logo} />
      </div>
      <div className="navCol2">
        <Link to="/Newsfeed">
          <img src={Home} />
        </Link>
        <Link to="/Search">
          <img src={Search} />
        </Link>
        <div onClick={() => setOpen(true)}>
          <img src={addImage} />
        </div>
        <Link to={`/Profile/${username}`}>
          <img src={Profile} />
        </Link>
        <div onClick={triggerLogout}>
          <img src={Logout} alt="" />
        </div>
        <NewPost open={open} closeFunc={handleClose} />
      </div>
      <div className="navCol3">
        <PopupState variant="popover">
          {(popupState) => (
            <React.Fragment>
              <Button
                style={{
                  backgroundColor: "var(--campfire-black)",
                  border: "none",
                }}
              >
                <img src={Hamburger} {...bindTrigger(popupState)} />
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem
                  as={Link}
                  to="/Newsfeed"
                  style={{ backgroundColor: "var(--campfire-dark-gray" }}
                  onClick={popupState.close}
                >
                  <p>Home</p>
                </MenuItem>
                <MenuItem
                  as={Link}
                  to="/Search"
                  onClick={popupState.close}
                  style={{ backgroundColor: "var(--campfire-dark-gray" }}
                >
                  <p>Search</p>
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  style={{ backgroundColor: "var(--campfire-dark-gray" }}
                >
                  <div onClick={() => setOpen(true)}>
                    <p>Add Post</p>
                  </div>
                </MenuItem>
                <MenuItem
                  as={Link}
                  to={`/Profile/${username}`}
                  onClick={popupState.close}
                  style={{ backgroundColor: "var(--campfire-dark-gray" }}
                >
                  <p>Profile</p>

                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  style={{ backgroundColor: "var(--campfire-dark-gray" }}
                >
                  <div onClick={triggerLogout}>
                    <p>Log Out</p>
                  </div>
                </MenuItem>
                <NewPost open={open} closeFunc={handleClose} />
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
    </div>
  );
};
export default NavBar;
