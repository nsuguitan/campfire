import Avatar from "../Avatar/Avatar";
import * as React from "react";
import CardHeader from "@mui/material/CardHeader";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";


const Stories = (props) => {
    return (
        <div>
            <div className="storiesContainer">
                <h1>Stories</h1>
            </div>
            <CardHeader
            avatar={
              <Avatar
                borderRadius="50%"
                height="50px"
                width="50px"
                profilepic={props.profilePicURL}
              />
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={
              <Link
                to={`/Profile/${props.username}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "17.5px",
                }}
              >
                {props.username}
              </Link>
            }
          />
        </div>    
    );
};

export default Stories