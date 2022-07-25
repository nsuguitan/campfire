import "../Postcard/Postcard.css";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretUp } from "@fortawesome/free-regular-svg-icons";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@mui/material/IconButton";

const Rating = (props) => {
  const intialRating = props.initialRating;
  const commentId = props.commentId;
  return (
    <div>
      <Rater initialRating={intialRating} commentId={commentId} />
    </div>
  );
};

const Rater = ({ initialRating, commentId }) => {
  const [rating, setRating] = useState(initialRating);
  const triggered = useRef(false);
  useEffect(() => {
    const updateRating = async () => {
      let loadRating = {
        commentRating: rating,
        commentId: commentId,
      };
      await fetch(process.env.REACT_APP_EXPRESS_URL + `/ratings/update`, {
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
    if (triggered.current) {
      updateRating();
      triggered.current = false;
    }
  }, [rating]);

  const handleClick = (e, changeVal, popupState) => {
    e.preventDefault();
    triggered.current = true;
    setRating(rating + changeVal);
    popupState.close();
  };

  return (
    <div className="rating-container" >
      <PopupState >
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
            <Menu {...bindMenu(popupState)}  >
              <MenuItem
                style={{backgroundColor: 'var(--campfire-dark-gray'}}
                onClick={(e) => {
                  handleClick(e, -2, popupState);
                }}
              >
                Fluffernutter
              </MenuItem>
              <MenuItem
                style={{backgroundColor: 'var(--campfire-dark-gray'}}
                onClick={(e) => {
                  handleClick(e, -1, popupState);
                }}
              >
                Uncooked
              </MenuItem>
              <MenuItem
                style={{backgroundColor: 'var(--campfire-dark-gray'}}
                onClick={(e) => {
                  handleClick(e, 1, popupState);
                }}
              >
                Toasted
              </MenuItem>
              <MenuItem
                style={{backgroundColor: 'var(--campfire-dark-gray'}}
                onClick={(e) => {
                  handleClick(e, 2, popupState);
                }}
              >
                Roasted
              </MenuItem>
              <MenuItem
                style={{backgroundColor: 'var(--campfire-dark-gray'}}
                onClick={(e) => {
                  handleClick(e, 3, popupState);
                }}
              >
                Burned
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
      <FontAwesomeIcon icon={faFireFlameCurved} size="sm" />
      <b id="rating">{rating}</b>
    </div>
  );
};

export default Rating;
