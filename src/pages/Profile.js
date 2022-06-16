//import Postcard from "../components/Postcard/Postcard";
import profilePicture from '../assets/profilePic.jpg';

const Profile = () => {
  return (
    <div className='pageContainer'>
      <div><h1>chelmerr</h1></div>
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

    </div>
  );
};
export default Profile;
