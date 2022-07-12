import Postcard from "../components/Postcard/Postcard";
import searchImage1 from "../assets/search1.jpg";
import searchImage2 from "../assets/search2.jpg";
import searchImage3 from "../assets/search3.jpg";
import searchImage4 from "../assets/search4.jpg";
import searchImage5 from "../assets/search5.jpg";
import searchImage6 from "../assets/search6.jpg";
import { useState } from "react";

import { useEffect } from "react";
const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`http://localhost:5000/posts/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      setPosts(await response.json());
    }

    getPosts();
    return;
  }, []);

  const storiesArray = [
    {
      image: searchImage1,
      name: "Your Story",
    },
    {
      image: searchImage2,
      name: "atran",
    },
    {
      image: searchImage3,
      name: "nsuguitan",
    },
    {
      image: searchImage4,
      name: "bigBen",
    },
    {
      image: searchImage5,
      name: "jRod",
    },
    {
      image: searchImage6,
      name: "chelmerr",
    },
  ];

  const displayStories = () => {
    return storiesArray.map((story) => (
      <div className="story" key={story.name}>
        <img className="storyImage" src={story.image} alt="" />
        <p>{story.name}</p>
      </div>
    ));
  };

  return (
    <div className="pageContainer">
      <div className="storiesContainer">{displayStories()}</div>
      <div className="followHeading">
        <p>Following</p>
        <p>|</p>
        <p>For You</p>
      </div>
      <div className="feedDisplay">
        <ul>
          {posts.map((post) => (
            <li className="feedListItem">
              <Postcard postId={post._id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Newsfeed;
