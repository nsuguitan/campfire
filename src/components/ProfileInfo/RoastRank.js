import { useState, useEffect } from "react";
const RoastRank = (props) => {
  const [roastRank, setRoastRank] = useState("Pleb");

  useEffect(() => {
    const getRoastInfo = async () => {
      const response = await fetch(
        `http://localhost:5000/comments/user/${props.profileUsername}`
      );
      return await response.json();
    };

    const calcRoastRank = async () => {
      let roastInfo = (await getRoastInfo())[0];
      roastInfo["avgRating"] = roastInfo.totalRating / roastInfo.count;
      switch (true) {
        case roastInfo["count"] >= 10 && roastInfo["avgRating"] >= 10:
          setRoastRank("Queen of Campfire");
          break;
        case roastInfo["count"] >= 5 && roastInfo["avgRating"] >= 5:
          setRoastRank("Roastmaster");
          break;
        case roastInfo["count"] >= 2 && roastInfo["avgRating"] >= 3:
          setRoastRank("Jester");
          break;
        default:
          setRoastRank("Pleb");
      }
    };

    calcRoastRank();
  }, [props.profileUsername]);

  return (
    <div className="roast-rank-container">
      <span>{roastRank}</span>
    </div>
  );
};

export default RoastRank;
