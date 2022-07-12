import "../Postcard/Postcard.css";
import * as React from "react";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretUp } from "@fortawesome/free-regular-svg-icons";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@mui/material/IconButton";

const Rating = (props) => {
  const intialRating = props.initialRating;
  const commentId= props.commentId;
  return (
    <div>
      <Rater initialRating={intialRating} 
      commentId={commentId}/>
    </div>
  );
};

const Rater = ({ initialRating, commentId }) => {
  const [rating, setRating] = useState(initialRating);
  
  const updateRating = async () => {
    let loadRating = {
      commentRating: rating,
      commentId: commentId
    };
    console.log(loadRating)
    await fetch("http://localhost:5000/ratings/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loadRating),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  };

  return (
    <div className="rating-container">
      <PopupState variant="popover">
        {(popupState) => (
          <React.Fragment>
            <IconButton
              {...bindTrigger(popupState)}
              size="small"
              sx={{ padding: 0.5 }}
              aria-label="add rating"
            >
              <FontAwesomeIcon icon={faSquareCaretUp} size="2xs" />
            </IconButton>
            <Menu {...bindMenu(popupState)}>
              <MenuItem
                onClick={() => {
                  setRating(rating - 2);
                  updateRating();
                  popupState.close();
                }}
              >
                Fluffernutter
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setRating(rating - 1);
                  updateRating();
                  popupState.close();
                }}
              >
                Uncooked
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setRating(rating + 1);
                  updateRating();
                  popupState.close();
                }}
              >
                Toasted
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setRating(rating + 2);
                  updateRating();
                  popupState.close();
                }}
              >
                Roasted
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setRating(rating + 3);
                  updateRating();
                  popupState.close();
                }}
              >
                Burned
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
      <FontAwesomeIcon icon={faFireFlameCurved} size="md" />
      <b id="rating">{rating}</b>
    </div>
  );
};

export default Rating;
