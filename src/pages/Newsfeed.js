import Postcard from "../components/Postcard/Postcard";
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
      <Postcard />
    </div>
  );
};
export default Newsfeed;
