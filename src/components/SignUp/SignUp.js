import { TextField, Box, Modal } from "@mui/material";
import { Button, Grid, Item } from "@mui/material";
import { useState } from "react";
import { AuthState } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUpComp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const handleUsernameInput = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePasswordInput = (evt) => {
    setPassword(evt.target.value);
  };
  const handleNameInput = (evt) => {
    setName(evt.target.value);
  };
  const handleEmailInput = (evt) => {
    setEmail(evt.target.value);
  };

  const handleVerificationCode = (evt) => {
    setVerificationCode(evt.target.value);
  };

  const triggerSignUp = async (event) => {
    console.log("Triggered signup");
    event.preventDefault();
    //const successfulSignUp = true;
    const successfulSignUp = await signup({ username, password, name, email });
    if (successfulSignUp) {
      console.log("After SignUp State:", isAuthenticated);
      setOpen(true);
      // console.log("Come on vamanos, everybody let's go!")
    }
  };

  const triggerVerification = async (event) => {
    event.preventDefault();
    console.log("Verification triggered!");
    //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#confirmSignUp-property
    let params = {
      ClientId: "4gjkaose7v4olc8mvsd40nf11f",
      ConfirmationCode: verificationCode,
      Username: username,
    };
    const successfulVerify = await verify(params);
    if (successfulVerify) {
      console.log("Attempt login after verification");
      const successfulLogin = await login({ username, password });
      if (successfulLogin) {
        console.log("successful login after verify");
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
          <TextField
            fullWidth
            sx={{ marginBottom: "10px" }}
            label="Username"
            value={username}
            size="small"
            variant="outlined"
            onChange={handleUsernameInput}
          />
          <TextField
            fullWidth
            sx={{ marginBottom: "10px" }}
            label="Password"
            value={password}
            size="small"
            variant="outlined"
            onChange={handlePasswordInput}
          />
          <TextField
            fullWidth
            sx={{ marginBottom: "10px" }}
            label="Full Name"
            value={name}
            size="small"
            variant="outlined"
            onChange={handleNameInput}
          />
          <TextField
            fullWidth
            sx={{ marginBottom: "10px" }}
            label="Email"
            value={email}
            size="small"
            variant="outlined"
            onChange={handleEmailInput}
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
