import Postcard from "../components/Postcard/Postcard";
import Stories from "../components/Stories/Stories";
import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { loadMorePosts } from "../services/GetPosts";
import './Newsfeed.css'


const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const response = await fetch(
        process.env.REACT_APP_EXPRESS_URL + `/posts/paged`
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

  const loadButtonClicked = async () => {
    document.getElementById("loadPostsButton").disabled = true;
    let newPosts = await loadMorePosts(posts[posts.length - 1]._id, 5);
    if (newPosts.length === 0) {
      document.getElementById("loadPostsButton").disabled = true;
    } else {
      setPosts((posts) => posts.concat(newPosts));
      document.getElementById("loadPostsButton").disabled = false;
    }
  };

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
              <Postcard postId={post._id} />
            </li>
          ))}
        </ul>
      </div>
      <div className="load-more-button-container">
        <Button
          onClick={loadButtonClicked}
          id="loadPostsButton"
          className="centered-page-button"
          sx={{
            color: "var(--campfire-white)",
            backgroundColor: "var(--campfire-orange)",
          }}
        >
          Load more...
        </Button>
      </div>
    </div>
  );
};
export default Newsfeed;
