import { useState, useEffect } from "react";
import Noob from '../../assets/noob.jpg';
import Bronze from '../../assets/bronze.jpg';
import Silver from '../../assets/silver.jpg';
import Gold from '../../assets/gold.jpg';

const RoastRank = (props) => {
  const [roastRank, setRoastRank] = useState("Noob");

  useEffect(() => {
    const getRoastInfo = async () => {
      const response = await fetch(
        process.env.REACT_APP_EXPRESS_URL +
          `/comments/user/${props.profileUsername}`
      );
      return await response.json();
    };

    const calcRoastRank = async () => {
      let roastInfo = (await getRoastInfo())[0];
      roastInfo["avgRating"] = roastInfo.totalRating / roastInfo.count;
      switch (true) {
        case roastInfo["count"] >= 10 && roastInfo["avgRating"] >= 10:
          setRoastRank(Gold);
          break;
        case roastInfo["count"] >= 5 && roastInfo["avgRating"] >= 5:
          setRoastRank(Silver);
          break;
        case roastInfo["count"] >= 2 && roastInfo["avgRating"] >= 3:
          setRoastRank(Bronze);
          break;
        default:
          setRoastRank(Noob);
      }
    };

    calcRoastRank();
  }, [props.profileUsername]);

  return (
    <div className="roast-rank-container">
      <img src={roastRank}/>
    </div>
  );
};

export default RoastRank;
