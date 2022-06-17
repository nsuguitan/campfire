import { Link } from "react-router-dom";
import searchImage1 from '../assets/search1.jpg';
import searchImage2 from '../assets/search2.jpg';
import searchImage3 from '../assets/search3.jpg';
import searchImage4 from '../assets/search4.jpg';
import searchImage5 from '../assets/search5.jpg';
import searchImage6 from '../assets/search6.jpg';
import searchImage7 from '../assets/search7.jpg';
import searchImage8 from '../assets/search8.jpg';
import searchImage9 from '../assets/search9.jpg';
import searchImage10 from '../assets/search10.jpg';
import searchImage11 from '../assets/search11.jpg';
import searchImage12 from '../assets/search12.jpg';
import searchImage13 from '../assets/search13.jpg';
import searchImage14 from '../assets/search14.jpg';
import searchImage15 from '../assets/search15.jpg';
import searchImage16 from '../assets/search16.jpg';
import searchIcon from '../assets/searchIcon.jpg';


const Search = () => {
    return (
      <div className='pageContainer'>
        <div className='searchHeading'>
          <img src={searchIcon} className='searchIcon'/>
          <input className='sarchBar'></input>
        </div>
        <div className='searchPhotosGrid'>
          <Link to='/Postcard'><img src={searchImage1} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage2} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage3} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage4} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage5} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage6} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage7} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage8} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage9} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage10} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage11} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage12} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage13} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage14} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage15} className='searchImage'/></Link>
          <Link to='/Postcard'><img src={searchImage16} className='searchImage'/></Link>
        </div>
      </div>
    );
  };
  export default Search;