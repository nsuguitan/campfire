import Postcard from "../components/Postcard/Postcard";
import searchImage1 from '../assets/search1.jpg';
import searchImage2 from '../assets/search2.jpg';
import searchImage3 from '../assets/search3.jpg';
import searchImage4 from '../assets/search4.jpg';
import searchImage5 from '../assets/search5.jpg';

import { useEffect } from "react";
const Newsfeed = () => {
  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`http://localhost:5000/posts/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const posts = await response.json();
      console.log(posts);
    }

    getPosts();

    return;
  }, []);
  return (
    <div className="pageContainer">
      <div className='storiesContainer'>
        <div className='story'>
          <img className='storyImage' src={searchImage1}/>
          <p>Username</p>
        </div>
      </div>
      <Postcard />
    </div>
  );
};
export default Newsfeed;
