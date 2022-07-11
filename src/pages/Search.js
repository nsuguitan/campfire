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
  {id: 1, image: searchImage1},
  {id: 2, image: searchImage2},
  {id: 3, image: searchImage3},
  {id: 4, image: searchImage4},
  {id: 5, image: searchImage5},
  {id: 6, image: searchImage6},
  {id: 7, image: searchImage7},
  {id: 8, image: searchImage8},
  {id: 9, image: searchImage9},
  {id: 10, image: searchImage10},
  {id: 11, image: searchImage11},
  {id: 12, image: searchImage12},
  {id: 13, image: searchImage13},
  {id: 14, image: searchImage14},
  {id: 15, image: searchImage15},
  {id: 16, image: searchImage16},
]

const displaySearchImages = () =>{
  return (
    searchImages.map(image => (
      <div className='searchImageButton' key={image.id}>
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