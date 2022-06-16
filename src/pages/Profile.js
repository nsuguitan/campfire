//import Postcard from "../components/Postcard/Postcard";
import profilePicture from '../assets/profilePic.jpg';
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


const Profile = () => {
  return (
    <div className='pageContainer'>
      <div className='bioContainer'><h1>chelmerr</h1></div>
      <div className='topProfileContainer'>
        <div className='profilePicContainer'>
          <img src={profilePicture} alt='' className='profilePic' />
        </div>
        <div className='profileStatsContainer'>
          <div className='roastRatingProfileContainer'>
            <h2>Roast Rank:</h2>
            <h2>Golden</h2>
          </div>
          <div className='profileDataContainer'>
            <div className='statEntry'>
              <h3>100</h3>
              <h5>Posts</h5>
            </div>
            <div className='statEntry'>
              <h3>200</h3>
              <h5>Following</h5>
            </div>
            <div className='statEntry'>
              <h3>300</h3>
              <h5>Followers</h5>
            </div>
          </div>
        </div>
      </div>
      <div className='bioContainer'>
        <div className='fullName'>
          <h2>Chelsea Merrill</h2>
        </div>
        <div className='bio'>
          <p>Former child, future Sith, and current survior of natual selection</p>
        </div>
      </div>
      <div className='imageGridContainer'>
        <div className='singleGridPhotoContainter'><img src={Image1} className='test'/></div>
        <img src={Image1} className='singleGridPhoto'/>
        <img src={Image2} className='singleGridPhoto'/>
        <img src={Image3} className='singleGridPhoto'/>
        <img src={Image4} className='singleGridPhoto'/>
        <img src={Image5} className='singleGridPhoto'/>
        <img src={Image6} className='singleGridPhoto'/>
        <img src={Image7} className='singleGridPhoto'/>
        <img src={Image8} className='singleGridPhoto'/>
        <img src={Image9} className='singleGridPhoto'/>
        <img src={Image10} className='singleGridPhoto'/>
      </div>

    </div>
  );
};
export default Profile;
