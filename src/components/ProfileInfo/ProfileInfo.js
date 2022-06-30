import profilePicture from '../../assets/profilePic.jpg';
import blueFlame from '../../assets/blueFlame.jpg';



const ProfileInfo = () => {
    return (
        <div className='profileInfoContainer'>
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
                        <img src={blueFlame} className='flame' />
                    </div>
                    <div className='bio'>
                        <p>Former child, future Sith, and current survivor of natural selection</p>
                    </div>
                </div>
        </div>
    );
};

export default ProfileInfo