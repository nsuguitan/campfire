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

  const storiesArray = [
    {
      image: searchImage1,
      name: 'Your Name'
    },
    {
      image: searchImage2,
      name: 'atran'
    },
    {
      image: searchImage3,
      name: 'nsuguitan'
    },
    {
      image: searchImage4,
      name: 'bigBen'
    },
    {
      image: searchImage5,
      name: 'jRAD'
    },

  ]

  const displayStories = () => {
    return (
      storiesArray.map( story => (
        <div className='story'>
        <img className='storyImage' src={story.image}/>
        <p>{story.name}</p>
        </div>
      ))
    );
  };


  return (
    <div className="pageContainer">
      <div className='storiesContainer'>
        {displayStories()} 
      </div>
      <Postcard />
    </div>
  );
};
export default Newsfeed;
