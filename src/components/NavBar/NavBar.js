import { Link } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";
import "./NavBar.css";
import { useState } from "react";
import NewPost from "../NewPost/NewPost";
import { AuthState } from "../../context/auth/AuthContext";
import Home from '../../assets/home.jpg';
import Search from '../../assets/search.jpg';
import addImage from '../../assets/addPost.jpg';
import DM from '../../assets/email.jpg';
import Profile from '../../assets/profile.jpg';
import Logo from '../../assets/logo.jpg';
import Hamburger from '../../assets/hamburger.jpg'

const NavBar = () => {
  const { isAuthenticated, username } = AuthState();
  let [open, setOpen] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false);
  const [blogs, setBlogs] = useState(null);
  const closeNav = () => setNavExpanded(false);
  const toggleNav = () => setNavExpanded(!navExpanded);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Navbar
      className="navContainer"
      style={isAuthenticated ? { display: "flex" } : { display: "none" }}
      expanded={navExpanded}
    >
      <div className='navCol1'>
        <img src={Logo}/>
      </div>
      <div className="navCol2">
        <Link to="/Newsfeed"><img src={Home} /></Link>
        <Link to="/Search"><img src={Search} /></Link>
        <div onClick={() => setOpen(true)}>
          <img src={addImage} />
        </div>
        <img src={DM} />
        <Link to={`/Profile/${username}`}><img src={Profile} /></Link>
        <NewPost open={open} closeFunc={handleClose} />
      </div>
      <div className='navCol3'>
       
        <img src={Hamburger}/>
      </div>
    </Navbar>
  );
};
export default NavBar;
