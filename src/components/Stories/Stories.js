import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Avatar from "../Avatar/Avatar";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./Stories.css";

const Stories = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(
        process.env.REACT_APP_EXPRESS_URL + `/users/`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      setUsers(await response.json());
    }

    let fwdSlide = document.getElementById("slide-forward");
    let backSlide = document.getElementById("slide-back");
    fwdSlide.onclick = () => {
      let container = document.getElementById("storiesContainer");
      sideScroll(container, "right", 25, 210, 10);
    };
    backSlide.onclick = () => {
      let container = document.getElementById("storiesContainer");
      sideScroll(container, "left", 25, 210, 10);
    };

    getUsers();
    return;
  }, []);

  const sideScroll = (element, direction, speed, distance, step) => {
    let scrollAmount = 0;
    let slideTimer = setInterval(() => {
      if (direction === "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  };

  return (
    <div className="row" id="storiesRow">
      <ul className="stories-nav">
        <li>
          <IconButton id="slide-back">
            <FontAwesomeIcon icon={faAngleLeft} />
          </IconButton>
        </li>
        <li>
          <div className="storiesContainer" id="storiesContainer">
            <div className="row">
              <ul className="stories">
                {users.map((user) => (
                  <li>
                    <div key={user._id} className="story">
                      <Link to={`/Profile/${user.username}`}>
                        <Avatar
                          borderRadius="50%"
                          height="75px"
                          width="75px"
                          profilepic={user.profilePicURL}
                        />
                      </Link>
                      <p>{user.username}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
        <li>
          <IconButton id="slide-forward">
            <FontAwesomeIcon icon={faAngleRight} />
          </IconButton>
        </li>
      </ul>
    </div>
  );
};

export default Stories;
