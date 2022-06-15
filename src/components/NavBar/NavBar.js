import { Link } from "react-router-dom";
import './NavBar.css';


const NavBar = () => {
    return (
      <div className='navContainer'>
        <Link to='/Newsfeed'>Home</Link>
        <Link to='/Profile'>Profile</Link>
        <h1>+</h1>
        <Link to='/Search'>Search</Link>
        <h1>DMs</h1>
      </div>
    );
  };
  export default NavBar;