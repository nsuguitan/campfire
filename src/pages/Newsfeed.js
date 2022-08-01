import Postcard from "../components/Postcard/Postcard";
import Stories from "../components/Stories/Stories";
import { useState } from "react";
import { useEffect } from "react";
import './Newsfeed.css'

const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const response = await fetch(
        process.env.REACT_APP_EXPRESS_URL + `/posts/`
      );

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

  return (
    <div className="pageContainer">
      <Stories />
      <div className="followHeading">
        <p>Following</p>
        <p>|</p>
        <p>For You</p>
      </div>
      <br/>
      <div className="feedDisplay">
        <ul>
          {posts.map((post) => (
            <li className="feedListItem postcardGlow" key={post._id}>
              <Postcard postId={post._id}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Newsfeed;
