import { Link } from "react-router-dom";
import profilePicture from '../assets/profilePic.jpg';
import blueFlame from '../assets/blueFlame.jpg';
import Image from '../assets/gridPhoto.jpg';
import Image1 from '../assets/gridPhoto1.jpg';
import Image2 from '../assets/gridPhoto2.jpg';
import Image3 from '../assets/gridPhoto3.jpg';
import Image4 from '../assets/gridPhoto4.jpg';
import Image5 from '../assets/gridPhoto5.jpg';
import Image6 from '../assets/gridPhoto6.jpg';
import Image7 from '../assets/gridPhoto7.jpg';
import Image8 from '../assets/gridPhoto8.jpg';
import Image9 from '../assets/gridPhoto9.jpg';
import Image10 from '../assets/gridPhoto10.jpg';

const profileImages = [
  {image: Image},
  {image: Image1},
  {image: Image2},
  {image: Image3},
  {image: Image4},
  {image: Image5},
  {image: Image6},
  {image: Image7},
  {image: Image8},
  {image: Image9},
  {image: Image10}
]
const displayProfileImages = () =>{
  return (
    profileImages.map(image => (
      <div className='profileImageButton'>
        <Link to='/Postcard' key={image}><img src={image.image} className='singleGridPhoto'/></Link>
      </div>
    ))
  )
}

const Profile = () => {
  return (
    <div className='pageContainer'>
      <br/>
      <div className='bioContainer'><h1>chelmerr</h1></div>
      <div className='topProfileContainer'>
        <div className='profilePicContainer'>
          <img src={profilePicture} alt='' className='profilePic' />
        </div>
        <div className='profileStatsContainer'>
          <div className='roastRatingProfileContainer'>
            <h2>Roast Rank:</h2>
            <span>Golden</span>
          </div>
          <div className='profileDataContainer'>
            {/* turn numbers into loops */}
            <div className='statEntry'>
              <h3>100</h3>
              <p>Posts</p>
            </div>
            <div className='statEntry'>
              <h3>200</h3>
              <p>Following</p>
            </div>
            <div className='statEntry'>
              <h3>300</h3>
              <p>Followers</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bioContainer'>
        <div className='fullName'>
          <h2>Chelsea Merrill</h2>
          <img src={blueFlame} className='flame'/>
        </div>
        <div className='bio'>
          <p>Former child, future Sith, and current survivor of natural selection</p>
        </div>
      </div>
      <div className='imageGridContainer'>
        {displayProfileImages()}
      </div>

    </div>
  );
};
export default Profile;
