import { useEffect, useState } from "react";
import blueFlame from "../../assets/blueFlame.jpg";
import Avatar from "../Avatar/Avatar";

const ProfileInfo = (props) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    profilePicURL: "",
    name: "",
    bio: "",
    followers: [],
    following: [],
  });
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(
        `http://localhost:5000/users/${props.profileUsername}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      setUserInfo(await response.json());
    };
    getUserInfo();
  }, [props.profileUsername]);

  useEffect(() => {
    setVerified(false);
    if (userInfo.followers.length >= 3) {
      setVerified(true);
    }
  }, [userInfo.followers.length]);

  return (
    <div className="profileInfoContainer">
      <div className="bioContainer">
        <h1>{props.profileUsername}</h1>
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
              <h3>{props.postCount}</h3>
              <p>Posts</p>
            </div>
            <div className="statEntry">
              <h3>{userInfo.following.length}</h3>
              <p>Following</p>
            </div>
            <div className="statEntry">
              <h3>{userInfo.followers.length}</h3>
              <p>Followers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bioContainer">
        <div className="fullName">
          <h2>{userInfo.name}</h2>
          {verified ? (
            <img src={blueFlame} alt="" className="flame" />
          ) : (
            <div />
          )}
        </div>
        <div className="bio">
          <p>{userInfo.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
