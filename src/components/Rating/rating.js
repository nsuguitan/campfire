import "../Postcard/Postcard.css";
import * as React from "react";
import { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquareCaretUp} from "@fortawesome/free-regular-svg-icons";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@mui/material/IconButton";

const Rater = ({ initialRating }) => {
  const [rating, setRating] = useState(initialRating)
  console.log(setRating)
  return (
    <div className='ratingCpntainer'>
      <div className="rating-container">
        <PopupState>
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
                <MenuItem onClick={() => setRating((rating) => rating - 2)}>Fluffernutter</MenuItem>
                <MenuItem onClick={() => setRating((rating) => rating - 1)}>Uncooked</MenuItem>
                <MenuItem onClick={() => setRating((rating) => rating + 1)}>Toasted</MenuItem>
                <MenuItem onClick={() => setRating((rating) => rating + 2)}>Roasted</MenuItem>
                <MenuItem onClick={() => setRating((rating) => rating + 3)}>Burned</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <FontAwesomeIcon icon={faFireFlameCurved} size="md" />
        <b id="rating">7</b>
      </div>
    </div>

  );
};

const Rating = () => {
  const intialRating = 5;
  return (
    <div className="testingClass">
      <Rater initialRating={intialRating} />
    </div>
  )
}

export default Rating;

