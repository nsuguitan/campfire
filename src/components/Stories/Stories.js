import Avatar from "../Avatar/Avatar";
import * as React from "react";
import CardHeader from "@mui/material/CardHeader";
import { Link } from "react-router-dom";


const Stories = (props) => {
    return (
        <div>
            <div className="storiesContainer">
                <h1>Stories</h1>
            </div>
            <Link to={`/Profile/${props.username}`}>
            <Avatar
                borderRadius="50%"
                height="50px"
                width="50px"
                profilepic={props.profilePicURL}
              />   
            </Link>
              <p>{props.username}</p>
        </div>    
    );
};

export default Stories