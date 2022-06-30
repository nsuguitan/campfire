import { Link } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";
import NewPost from "../NewPost/NewPost";

const NavBar = () => {
  let [open, setOpen] = useState(true);
  return (
    <div className="navContainer">
      <Link to="/Newsfeed">Home</Link>
      <Link to="/Search">Search</Link>
      <div id="addButton">
        <p>+</p>
      </div>
      <p>DM</p>
      <Link to="/Profile">Profile</Link>
      <NewPost open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
export default NavBar;
