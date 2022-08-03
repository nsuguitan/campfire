import { TextField, Box, Modal } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { AuthState } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import * as AWS from "aws-sdk";
import "./SignUp.css";
import '../SignIn/SignIn.css';
import AuthInput from "../AuthInput/AuthInput";
import Image1 from "../../assets/profilePicPlaceholder.jpg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { faSquareCaretUp } from "@fortawesome/free-regular-svg-icons";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";

const handleClick = (e, changeVal, popupState) => {
  e.preventDefault();
  popupState.close();
};

const SignUpComp = () => {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(Image1);
  const [bio, setBio] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const { login, signup, verify, isAuthenticated } = AuthState();
  const { register, handleSubmit, watch, errors } = useForm();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "var(--campfire-dark-gray)",
    border: "2px solid var(--campfire-gray)",
    boxShadow: 24,
    color: 'white',
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
          <h2>Tell us about your <span style={{color: 'var(--campfire-orange)', fontSize: '.7em'}}>(boring) </span>self</h2>
          <div className="sign-up-input-container">
            <div className='infoLine'>
              <div className='infoCol1'>
                <p>Full name</p>
              </div>
              <div className='infoCol2'>
              <AuthInput
              name="fullname"
              value={textFields.fullname}
              onChange={handleTextChange}
              required
              />
              </div>
            </div>
            <div className='infoLine'>
              <div className='infoCol1'>
                <p>Email address</p>
              </div>
              <div className='infoCol2'>
              <AuthInput
              name="email"
              value={textFields.email}
              onChange={handleTextChange}
              required
              />
              </div>
            </div>
            <div className='infoLine'>
              <div className='infoCol1'>
                <p>Username</p>
              </div>
              <div className='infoCol2'>
              <AuthInput
              name="username"
              value={textFields.username}
              onChange={handleTextChange}
              required
              />
              </div>
            </div>
            <div className='infoLine'>
              <div className='infoCol1'>
                <p>Password</p>
                <PopupState variant="popover">
        {(popupState) => (
          <React.Fragment>
            <IconButton
              {...bindTrigger(popupState)}
              size="small"
              sx={{ padding: 0.5 }}
            >
              <FontAwesomeIcon icon={faSquareCaretUp} size="2xs" />
            </IconButton>
            <Menu {...bindMenu(popupState)}>
              <MenuItem style={{ backgroundColor: "var(--campfire-dark-gray", fontSize: '.7em', fontFamily: 'Quicksand'}}>your password must contain:</MenuItem>
              <MenuItem style={{ backgroundColor: "var(--campfire-dark-gray", fontSize: '.7em', fontFamily: 'Quicksand' }}> - at least 6 characters</MenuItem>
              <MenuItem style={{ backgroundColor: "var(--campfire-dark-gray", fontSize: '.7em', fontFamily: 'Quicksand' }}> - an uppercase letter</MenuItem>
              <MenuItem style={{ backgroundColor: "var(--campfire-dark-gray", fontSize: '.7em', fontFamily: 'Quicksand' }}> - a lowercase letter</MenuItem>
              <MenuItem style={{ backgroundColor: "var(--campfire-dark-gray", fontSize: '.7em', fontFamily: 'Quicksand' }}> - a number</MenuItem>
              <MenuItem style={{ backgroundColor: "var(--campfire-dark-gray", fontSize: '.7em', fontFamily: 'Quicksand' }}> - and a special character</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
              </div>
              <div className='infoCol2'>
              <AuthInput
              name="password"
              value={textFields.password}
              onChange={handleTextChange}
              required
              />
              </div>
            </div>
            <div className='infoLine'>
              <div className='infoCol1'>
                <p>Upload profile photo</p>
              </div>
              <div className='infoCol2'>
              <label
              htmlFor="profile-image-upload"
              className="profile-image-upload-label"
              >
                <img
                className="profile-image-preview"
                src={imageSrc}
                alt="None"
              ></img>
              <input
                id="profile-image-upload"
                type="file"
                onChange={onFileChange}
                accept="image/*"
                required
              />
              </label>
              </div> 
            </div>
            <div className='infoLine'>
              <div className='infoCol1'></div>
              <div className='infoCol2'>
              <textarea
              id="profile-bio"
              name="profile-bio"
              onChange={handleBioChange}
              rows="4"
              cols="34"
              placeholder="C'mon write a bio. Don't be lame."
              value={bio}
              ></textarea>
              </div>
            </div>
            <div className='createButtonContainer'>
              <Button
              className='createAccountButton'
              disableElevation
              onClick={triggerSignUp}
              sx={{
                backgroundColor: "var(--campfire-orange)",
                color: 'var(--campfire-white)',
                fontFamily: 'Quicksand'
              }}
            >
             Create account
            </Button>
            </div>
          </div>  
        </div>
        <div className='signConatiner2'>
          <div className="bottom-container">
            <p>Already have an account?</p>
            <Button
              disableElevation
              sx={{
                backgroundColor: "transparent",
                textTransform: "none",
                color: "var(--campfire-orange)",
                width: '130px',
                fontFamily: "Quicksand",
                fontSize: '1em'
              }}
              onClick={() => navigate("/SignIn")}
            >
              log in, dummy
            </Button>
          </div>

        </div>  
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ ...style, width: 400, backgroundColor: 'var(--campfire-dark-gray)' }}>
          <h2> Verification Code</h2>
          <TextField
            fullWidth
            label="Enter code here"
            value={verificationCode}
            size="small"
            variant="outlined"
            onChange={handleVerificationCode}
            sx={{color: 'white', border: '1px solid var(--campfire-gray)'}}
          />
          <Button onClick={triggerVerification} styles={{color: 'var(--campfire-white)', backgroundColor: 'var(--campfire-orange)'}}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SignUpComp;
