import { Modal, Box, Button } from "@mui/material";
import { useState } from "react";
import CropImage from "./CropImage";
import "./NewPost.css";

//load image to cropper
//https://codesandbox.io/s/react-easy-crop-custom-image-demo-y09komm059?file=/src/index.js:3951-4013

const NewPost = (props) => {
  const [imageSelected, setImageSelected] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    textAlign: "center",
    display: "grid",
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      //checks to see if files were loaded
      const file = e.target.files[0]; //grabs first file
      let imageDataUrl = await readFile(file); //waits for promise
      setImageSrc(imageDataUrl);
      setImageSelected(true);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false); //fired when image has been read successfully
      reader.readAsDataURL(file); // reads contents of file or blob and represents the file's data as a base64 encoded string, triggers loadend, thus resolving the promise
    });
  };
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box sx={{ ...style }}>
        {imageSelected ? (
          <CropImage id="crop-image" image={imageSrc} />
        ) : (
          <label htmlFor="image-upload" className="image-upload-label">
            Load Image
            <input
              id="image-upload"
              type="file"
              onChange={onFileChange}
              accept="image/*"
            />
          </label>
        )}
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
