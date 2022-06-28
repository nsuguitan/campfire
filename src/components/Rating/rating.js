{/* <div className="rating-container">
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
      <MenuItem onClick={() => {
        popupState.close(); 
        subTwo();
        }}>Fluffernutter</MenuItem>
      <MenuItem onClick={popupState.close}>Uncooked</MenuItem>
      <MenuItem onClick={popupState.close}>Toasted</MenuItem>
      <MenuItem onClick={popupState.close}>Roasted</MenuItem>
      <MenuItem onClick={popupState.close}>Burned</MenuItem>
    </Menu>
  </React.Fragment>
  )}
</PopupState>
  <FontAwesomeIcon icon={faFireFlameCurved} size="md" />
  <b id="rating">7</b> 
  {/* not showing up */}
// </div> */}
