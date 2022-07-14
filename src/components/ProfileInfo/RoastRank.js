import { useState, useEffect } from "react";
const RoastRank = () => {
  const [roastRank, setRoastRank] = useState("Pleb");

  useEffect(() => {
    const getRoastRank = () => {};
    getRoastRank();
  }, []);

  return (
    <div className="roast-rank-container">
      <span>{roastRank}</span>
    </div>
  );
};

export default RoastRank;
