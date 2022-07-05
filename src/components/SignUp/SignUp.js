import { TextField, Box, Modal } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { AuthState } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import AuthInput from "../AuthInput/AuthInput";

const SignUpComp = () => {
  const [open, setOpen] = useState(false);
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
      if (successfulLogin) {
        setTimeout(() => {
          navigate("/Newsfeed");
        }, 1000);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <Box
        sx={{
          width: 1,
          height: 0.95,
          border: 1,
          borderColor: "#212121",
          borderWidth: "3px",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Campfire</h1>
        <div className="sign-up-input-container">
          <AuthInput
            name="username"
            label="Username"
            value={textFields.username}
            onChange={handleTextChange}
          />
          <AuthInput
            name="password"
            label="Password"
            value={textFields.password}
            onChange={handleTextChange}
          />
          <AuthInput
            name="fullname"
            label="Full Name"
            value={textFields.fullname}
            onChange={handleTextChange}
          />
          <AuthInput
            name="email"
            label="Email"
            value={textFields.email}
            onChange={handleTextChange}
          />
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
            SignUp
          </Button>
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
