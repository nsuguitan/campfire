import { Modal, Box, Button } from "@mui/material";

const NewPost = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    textAlign: "center",
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box sx={{ ...style }}>
        <h2>Add photo</h2>
        <img src="http://placecorgi.com/600" alt="no puppers" />
        <Button
          fullWidth
          variant="contained"
          sx={{ left: 0, bottom: 0, position: "absolute" }}
        >
          Let the roasting begin
        </Button>
      </Box>
    </Modal>
  );
};

export default NewPost;
