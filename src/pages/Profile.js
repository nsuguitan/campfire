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
  {id: 1, image: Image},
  {id: 2, image: Image1},
  {id: 3, image: Image2},
  {id: 4, image: Image3},
  {id: 5, image: Image4},
  {id: 6, image: Image5},
  {id: 7, image: Image6},
  {id: 8, image: Image7},
  {id: 9, image: Image8},
  {id: 10, image: Image9},
  {id: 11, image: Image10}
]
const displayProfileImages = () =>{
  return (
    profileImages.map(image => (
      <div className='profileImageButton' key={image.id}>
        <Link to='/Postcard'><img src={image.image} className='singleGridPhoto'/></Link>
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
