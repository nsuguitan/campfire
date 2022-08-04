const updateFollowers = async (username, follower, isFollower) => {
  let updateFollowers = {
    follower: follower,
    isFollower: isFollower,
  };
  let response = await fetch(
    process.env.REACT_APP_EXPRESS_URL + `/users/${username}/followers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFollowers),
    }
  );
  return response;
};

const updateFollowing = async (username, following, isFollowing) => {
  let updateFollowing = {
    following: following,
    isFollowing: isFollowing,
  };
  let response = await fetch(
    process.env.REACT_APP_EXPRESS_URL + `/users/${username}/following`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFollowing),
    }
  );
  return response;
};

export { updateFollowers, updateFollowing };
