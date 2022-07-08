import { Modal, Box, Button } from "@mui/material";
import { useState, useCallback } from "react";
import CropImage from "./CropImage";
import "./NewPost.css";
import Cropper from "react-easy-crop";
import { getCroppedImage } from "./CropImage";
//import { S3 } from "aws-sdk/clients/s3";
import * as AWS from "aws-sdk";

import { v4 as uuidv4 } from "uuid";

//load image to cropper
//https://codesandbox.io/s/react-easy-crop-custom-image-demo-y09komm059?file=/src/index.js:3951-4013

const NewPost = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSelected, setImageSelected] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [postImage, setPostImage] = useState(null);

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

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createPost = async () => {
    try {
      const croppedImage = await getCroppedImage(imageSrc, croppedAreaPixels);
      setPostImage(croppedImage);

      let file = await fetch(croppedImage)
        .then((r) => r.blob())
        .then(
          (blobFile) =>
            new File([blobFile], "test-image", { type: "image/jpeg" })
        );
      let filename = uuidv4(); // uniqueFilename();
      await uploadFilesToS3(".jpeg", file, filename);
    } catch (e) {
      console.error(e);
    }
  };

  const uploadFilesToS3 = async (extension, file, fileName) => {
    return new Promise(async (resolve, reject) => {
      const bucket = new AWS.S3({
        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_S3_ACCESS_SECRET,
        region: "us-east-1",
      });
      const params = {
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
        Key: fileName + extension,
        Body: file,
      };
      bucket.upload(params, async (err, data) => {
        if (data) {
          let resourceURL =
            process.env.REACT_APP_AWS_S3_BUCKET_URL + fileName + extension;
          await uploadToMongo(resourceURL);
        }
        if (err) {
        }
      });
    });
  };

  const uploadToMongo = async (resourceURL) => {
    let loadPost = {
      author: {
        username: "foobar",
        profilePicURL: "http://placecorgi.com/260/180",
      },
      postDate: new Date(),
      photoURL: resourceURL,
    };
    handleClose();
    await fetch("http://localhost:5000/posts/add/userId/foobar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loadPost),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  };

  const handleClose = () => {
    console.log("Triggered Handle Close");
    props.closeFunc();
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setImageSelected(false);
    setImageSrc(null);
    setPostImage(null);
  };
  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box sx={{ ...style }}>
        {imageSelected ? (
          <Cropper
            id="crop-image"
            image={imageSrc}
            crop={crop}
            cropSize={{ width: 600, height: 600 }}
            zoom={zoom}
            aspect={1}
            showGrid={true}
            objectFit={"horizontal-cover"}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          ></Cropper>
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
          onClick={createPost}
        >
          Let the roasting begin
        </Button>
      </Box>
    </Modal>
  );
};

export default NewPost;
