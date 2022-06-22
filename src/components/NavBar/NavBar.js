import { Link } from "react-router-dom";
import './NavBar.css';


const NavBar = () => {
    return (
      <div className='navContainer'>
        <Link to='/Newsfeed'>Home</Link>
        <Link to='/Search'>Search</Link>
        <div id='addButton'>
            <p>+</p>
        </div>
        <p>DM</p>
        <Link to='/Profile'>Profile</Link>
      </div>
    );
  };
  export default NavBar;