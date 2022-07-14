import { useState, useEffect } from "react";
const RoastRank = (props) => {
  const [roastRank, setRoastRank] = useState("Pleb");

  useEffect(() => {
    const getRoastRank = async () => {
      console.log("Profile Username: ", props.profileUsername);
      const response = await fetch(
        `http://localhost:5000/comments/user/${props.profileUsername}`
      );
      const roastInfo = await response.json();
      console.log("roast info returned: ", roastInfo);
    };
    getRoastRank();
  }, []);

  return (
    <div className="roast-rank-container">
      <span>Golden</span>
    </div>
  );
};

export default RoastRank;
