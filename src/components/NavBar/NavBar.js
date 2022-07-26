import { Link } from "react-router-dom";
import "./NavBar.css";
import { useState } from "react";
import NewPost from "../NewPost/NewPost";
import { AuthState } from "../../context/auth/AuthContext";
import Home from '../../assets/home.jpg';
import Search from '../../assets/search.jpg';
import addImage from '../../assets/addPost.jpg';
import DM from '../../assets/email.jpg';
import Profile from '../../assets/profile.jpg';

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
      <Link to="/Newsfeed"><img src={Home}/></Link>
      <Link to="/Search"><img src={Search}/></Link>
      <div onClick={() => setOpen(true)}>
        <img src={addImage}/>
      </div>
      <img src={DM}/>
      <Link to={`/Profile/${username}`}><img src={Profile}/></Link>
      <NewPost open={open} closeFunc={handleClose} />
    </div>
  );
};
export default NavBar;
