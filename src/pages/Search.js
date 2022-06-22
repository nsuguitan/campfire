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

const searchImages = [
  {image: searchImage1},
  {image: searchImage2},
  {image: searchImage3},
  {image: searchImage4},
  {image: searchImage5},
  {image: searchImage6},
  {image: searchImage7},
  {image: searchImage8},
  {image: searchImage9},
  {image: searchImage10},
  {image: searchImage11},
  {image: searchImage12},
  {image: searchImage13},
  {image: searchImage14},
  {image: searchImage15},
  {image: searchImage16},
]

const displaySearchImages = () =>{
  return (
    searchImages.map(image => (
      <div className='searchImageButton' key={image}>
        <Link to='/Postcard'><img src={image.image} className='searchImage'/></Link>
      </div>
    ))
  )
}

const Search = () => {
    return (
      <div className='pageContainer'>
        <div className='searchHeading'>
          <img src={searchIcon} className='searchIcon'/>
          <input className='sarchBar'></input>
        </div>
        <div className='searchPhotosGrid'>
          {displaySearchImages()}
        </div>
      </div>
    );
  };
  export default Search;