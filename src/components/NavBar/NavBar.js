import { Link } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";
import NewPost from "../NewPost/NewPost";
import { AuthState } from "../../context/auth/AuthContext";

const NavBar = () => {
  const { isAuthenticated, username } = AuthState();
  let [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
      className="navContainer"
      style={isAuthenticated ? { display: "flex" } : { display: "none" }}
    >
      <Link to="/Newsfeed">Home</Link>
      <Link to="/Search">Search</Link>
      <div id="addButton" onClick={() => setOpen(true)}>
        <p>+</p>
      </div>
      <p>DM</p>
      <Link to={`/Profile/${username}`}>Profile</Link>
      <NewPost open={open} closeFunc={handleClose} />
    </div>
  );
};
export default NavBar;
