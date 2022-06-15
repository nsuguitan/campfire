import { Link } from "react-router-dom";
import './NavBar.css';


const NavBar = () => {
    return (
      <div className='navContainer'>
        <Link to='/Newsfeed'>Home</Link>
        <Link to='/Search'>Search</Link>
        <div id='addButton'>
            <h1>+</h1>
        </div>
        <h1>DMs</h1>
        <Link to='/Profile'>Profile</Link>
      </div>
    );
  };
  export default NavBar;