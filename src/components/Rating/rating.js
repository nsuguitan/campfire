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

const Rating = () => {
  const intialRating = 0;
  // get from database
  // pass it through with the commentid
  return (
    <div className="testingClass">
      <Rater initialRating={intialRating} />
    </div>
  )
};

const Rater = ({ initialRating }) => {
  const [rating, setRating] = useState(initialRating)
  console.log(rating)
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
                <MenuItem onClick={() => {setRating(rating - 2); popupState.close()}}>Fluffernutter</MenuItem>
                <MenuItem onClick={() => {setRating(rating - 1); popupState.close()}}>Uncooked</MenuItem>
                <MenuItem onClick={() => {setRating(rating + 1); popupState.close()}}>Toasted</MenuItem>
                <MenuItem onClick={() => {setRating(rating + 2); popupState.close()}}>Roasted</MenuItem>
                <MenuItem onClick={() => {setRating(rating + 3); popupState.close()}}>Burned</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <FontAwesomeIcon icon={faFireFlameCurved} size="md" />
        <b id="rating">{rating}</b>
      </div>
    </div>
  );
};

export default Rating;

