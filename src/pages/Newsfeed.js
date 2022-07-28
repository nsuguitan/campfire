import Postcard from "../components/Postcard/Postcard";
import Stories from "../components/Stories/Stories";
import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { loadMorePosts } from "../services/GetPosts";

const Newsfeed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const response = await fetch(
        process.env.REACT_APP_EXPRESS_URL + `/posts/paged/?lastPost=&size=`
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
    console.log(posts[posts.length - 1]._id);
    let newPosts = await loadMorePosts(posts[posts.length - 1]._id, 5);
    console.log(newPosts);
    setPosts((posts) => posts.concat(newPosts));
  };

  return (
    <div className="pageContainer">
      <Stories />
      <div className="followHeading">
        <p>Following</p>
        <p>|</p>
        <p>For You</p>
      </div>
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
