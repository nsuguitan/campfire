import { TextField, Box, Modal } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { AuthState } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import * as AWS from "aws-sdk";
import "./SignUp.css";
import '../SignIn/SignIn.css';
import AuthInput from "../AuthInput/AuthInput";
import Image1 from "../../assets/addImage.jpg";

const SignUpComp = () => {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(Image1);
  const [bio, setBio] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const { login, signup, verify, isAuthenticated } = AuthState();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const navigate = useNavigate();

  const [textFields, setTextFields] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
  });

  const handleTextChange = (e) =>
    setTextFields({
      ...textFields,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleBioChange = (e) => {
    setBio(e.currentTarget.value);
  };

  const handleVerificationCode = (evt) => {
    setVerificationCode(evt.target.value);
  };

  const triggerSignUp = async (event) => {
    event.preventDefault();
    const successfulSignUp = await signup(textFields);
    if (successfulSignUp) {
      setOpen(true);
    }
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      //checks to see if files were loaded
      const file = e.target.files[0]; //grabs first file
      let imageDataUrl = await readFile(file); //waits for promise
      setImageSrc(imageDataUrl);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false); //fired when image has been read successfully
      reader.readAsDataURL(file); // reads contents of file or blob and represents the file's data as a base64 encoded string, triggers loadend, thus resolving the promise
    });
  };

  const uploadFilesToS3 = async (extension, imageSrc, fileName) => {
    let file = await fetch(imageSrc)
      .then((r) => r.blob())
      .then(
        (blobFile) => new File([blobFile], "test-image", { type: "image/jpeg" })
      );
    return new Promise(async (resolve, reject) => {
      const bucket = new AWS.S3({
        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_S3_ACCESS_SECRET,
        region: "us-east-1",
      });
      const params = {
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
        Key: "profile-pictures/" + fileName + extension,
        Body: file,
      };
      bucket.upload(params, async (err, data) => {
        if (data) {
          let resourceURL =
            process.env.REACT_APP_AWS_S3_BUCKET_URL +
            "profile-pictures/" +
            fileName +
            extension;
          await createMongoUser(resourceURL);
        }
        if (err) {
        }
      });
    });
  };

  const createMongoUser = async (resourceURL) => {
    let loadUser = {
      username: textFields.username,
      profilePicURL: resourceURL,
      name: textFields.fullname,
      bio: bio,
      followers: [],
      following: [],
    };
    await fetch(`${process.env.REACT_APP_EXPRESS_URL}/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loadUser),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  };

  const triggerVerification = async (event) => {
    event.preventDefault();
    //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#confirmSignUp-property
    let params = {
      ClientId: "4gjkaose7v4olc8mvsd40nf11f",
      ConfirmationCode: verificationCode,
      Username: textFields.username,
    };
    const successfulVerify = await verify(params);
    if (successfulVerify) {
      const successfulLogin = await login({
        username: textFields.username,
        password: textFields.password,
      });
      uploadFilesToS3(".jpeg", imageSrc, textFields.username);
      if (successfulLogin) {
        setTimeout(() => {
          navigate("/Newsfeed");
        }, 1000);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <Box>
      <div className='signConatiner1'>
          <h1>Tell us about your <span style={{color: 'var(--campfire-orange)'}}>(boring) </span>self</h1>
          <div className="sign-up-input-container">
            <div className='infoLine'> 
              <p>Full name</p>
              <AuthInput
              name="fullname"
              value={textFields.fullname}
              onChange={handleTextChange}
              />
            </div>
            <div className='infoLine'>
              <p>Email address</p>
              <AuthInput
              name="email"
              label="Email"
              value={textFields.email}
              onChange={handleTextChange}
              />
            </div>
            <div className='infoLine'>
              <p>Username</p>
              <AuthInput
              name="username"
              label="Username"
              value={textFields.username}
              onChange={handleTextChange}
              />
            </div>
            <div className='infoLine'>
              <p>Pasword</p>
              <AuthInput
              name="password"
              label="Password"
              value={textFields.password}
              onChange={handleTextChange}
              />
            </div>
            <div className='infoLine'>
              <p>Upload profile photo</p>
              <label
              htmlFor="profile-image-upload"
              className="profile-image-upload-label"
              >
              Load Profile Picture
              <input
                id="profile-image-upload"
                type="file"
                onChange={onFileChange}
                accept="image/*"
              />
              <img
                className="profile-image-preview"
                src={imageSrc}
                alt="None"
              ></img>
              </label>
            </div>
            <textarea
              id="profile-bio"
              name="profile-bio"
              onChange={handleBioChange}
              rows="4"
              cols="40"
              placeholder="C'mon write a bio. Don't be lame."
              value={bio}
            ></textarea>
            <Button
              disableElevation
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#ee7e00",
                marginBottom: "10px",
              }}
              onClick={triggerSignUp}
            >
             Create account
            </Button>
    
          </div>
          {/* <p id="passwordReq">
            **your password must contain at least 6 characters, an uppercase, a
            lowercase, a number, and a special character**
          </p> */}
         
        

          
        </div>
        <div className='signConatiner2'>
          <div className="bottom-container">
            <p>Already have an account?</p>
            <Button
              disableElevation
              variant="contained"
              sx={{
                backgroundColor: "transparent",
                textTransform: "none",
                color: "var(--campfire-orange)",
                width: '130px',
                fontFamily: "Quicksand",
                fontSize: '1em'
              }}
              onClick={() => navigate("/SignUp")}
            >
              log in, dummy
            </Button>
          </div>

        </div>  
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ ...style, width: 400 }}>
          <h2> Verification Code</h2>
          <TextField
            fullWidth
            label="Enter code here"
            value={verificationCode}
            size="small"
            variant="outlined"
            onChange={handleVerificationCode}
          />
          <Button onClick={triggerVerification}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SignUpComp;
