import { Link } from "react-router-dom";
import Image from '../assets/gridPhoto.jpg';
import Image1 from '../assets/gridPhoto1.jpg';
import Image2 from '../assets/gridPhoto2.jpg';
import Image3 from '../assets/gridPhoto3.jpg';
import Image4 from '../assets/gridPhoto4.jpg';
import Image5 from '../assets/gridPhoto5.jpg';
import Image6 from '../assets/gridPhoto6.jpg';
import Image7 from '../assets/gridPhoto7.jpg';
import Image8 from '../assets/gridPhoto8.jpg';
import Image9 from '../assets/gridPhoto9.jpg';
import Image10 from '../assets/gridPhoto10.jpg';
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";

const profileImages = [
  {image: Image},
  {image: Image1},
  {image: Image2},
  {image: Image3},
  {image: Image4},
  {image: Image5},
  {image: Image6},
  {image: Image7},
  {image: Image8},
  {image: Image9},
  {image: Image10}
]
const displayProfileImages = () =>{
  return (
    profileImages.map(image => (
      <div className='profileImageButton'>
        <Link to='/Postcard' key={image}><img src={image.image} className='singleGridPhoto'/></Link>
      </div>
    ))
  )
}

const Profile = () => {
  return (
    <div className='pageContainer'>
      <br/>
      <ProfileInfo />
      <div className='imageGridContainer'>
        {displayProfileImages()}
      </div>

    </div>
  );
};
export default Profile;
