import "../Postcard/Postcard.css";
import * as React from "react";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const PostInfo = () => {
    return (
        <div className='postInfoContainer'>
            <CardActions disableSpacing>
                <IconButton
                    sx={{ minHeight: 0, minWidth: 0, padding: 0.5 }}
                    aria-label="add comment"
                >
                    <FontAwesomeIcon icon={faComment} />
                </IconButton>
                <IconButton
                    sx={{ minHeight: 0, minWidth: 0, padding: 0.5 }}
                    aria-label="share"
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </IconButton>
                <p id="postTime">9 hours ago</p>
            </CardActions>
        </div>
    );
};

export default PostInfo