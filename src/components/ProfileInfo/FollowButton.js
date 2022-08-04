import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { AuthState } from "../../context/auth/AuthContext";
import { updateFollowers, updateFollowing } from "../../services/Users"

const FollowButton = (props) => {
  let { username } = AuthState();
  let [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    // console.log(props.userInfo.followers.includes(username));
    console.log("userInfo: ", props.userInfo);
    // console.log(isFollowing);
    // console.log(username);
    setIsFollowing((props.userInfo.followers).includes(username));
  }, [props.userInfo])

  const toggleFollowStatus = async (e) => {
    e.preventDefault();
    let followersUpdated = updateFollowers(props.userInfo.username, username, isFollowing);
    let followingUpdated = updateFollowing(username, props.userInfo.username, isFollowing);
    Promise.all([followersUpdated, followingUpdated]).then(() => {
      isFollowing ?
        props.setUserInfo({ ...props.userInfo, followers: props.userInfo.followers.filter(e => e !== username) }) :
        props.setUserInfo({ ...props.userInfo, followers: props.userInfo.followers.concat([username]) })
      //console.log("updated followers", props.userInfo)
      setIsFollowing(!isFollowing);
    });
  };

  return <Button variant="contained" onClick={(e) => toggleFollowStatus(e)}>{isFollowing ? "Unfollow" : "Follow"}</Button>;
};

export default FollowButton;
