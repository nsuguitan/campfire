import { Link } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";
import { useEffect, useState } from "react";
import { AuthState } from "../context/auth/AuthContext";

const Profile = () => {
  const [profileImagesArray, setProfileImagesArray] = useState([]);
  const { username } = AuthState();
  useEffect(() => {
    async function loadProfileImages() {
      const response = await fetch(
        `http://localhost:5000/posts/user/${username}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      setProfileImagesArray(await response.json());
      //console.log(await response.json());
    }
    loadProfileImages();
  }, []);

  const displayProfileImages = () => {
    return profileImagesArray.map((post) => (
      <div className="profileImageButton">
        <Link to="/Postcard" key={post._id}>
          <img
            src={post.photoURL}
            alt="http://placecorgi.com/250"
            className="singleGridPhoto"
          />
        </Link>
      </div>
    ));
  };
  return (
    <div className="pageContainer">
      <br />
      <ProfileInfo />
      <div className="imageGridContainer">{displayProfileImages()}</div>
    </div>
  );
};
export default Profile;
