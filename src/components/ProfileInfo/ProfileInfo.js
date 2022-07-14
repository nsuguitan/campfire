import { useEffect, useState } from "react";
import blueFlame from "../../assets/blueFlame.jpg";
import Avatar from "../Avatar/Avatar";
import { AuthState } from "../../context/auth/AuthContext";

const ProfileInfo = () => {
  const { username } = AuthState();
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(`http://localhost:5000/users/${username}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      setUserInfo(await response.json());
    };
    getUserInfo();
  }, []);

  return (
    <div className="profileInfoContainer">
      <div className="bioContainer">
        <h1>{username}</h1>
      </div>
      <div className="topProfileContainer">
        <div className="profilePicContainer">
          <Avatar
            profilepic={userInfo.profilePicURL}
            borderRadius="10%"
            height="200px"
            width="200px"
          />
        </div>
        <div className="profileStatsContainer">
          <div className="roastRatingProfileContainer">
            <h2>Roast Rank:</h2>
            <span>Golden</span>
          </div>
          <div className="profileDataContainer">
            <div className="statEntry">
              <h3>100</h3>
              <p>Posts</p>
            </div>
            <div className="statEntry">
              <h3>200</h3>
              <p>Following</p>
            </div>
            <div className="statEntry">
              <h3>300</h3>
              <p>Followers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bioContainer">
        <div className="fullName">
          <h2>{userInfo.name}</h2>
          <img src={blueFlame} alt="" className="flame" />
        </div>
        <div className="bio">
          <p>{userInfo.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
