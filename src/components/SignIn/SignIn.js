import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import { TextField, Box } from "@mui/material";
import { Button, Grid, Item } from "@mui/material";
import { useState } from 'react';
import { AuthState } from "../../context/auth/AuthContext"
import "./SignIn.css";
const SignInComp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = AuthState();

  const handleUsernameInput = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePasswordInput = (evt) => {
    setPassword(evt.target.value);
  };

  const triggerLogin = event => {
    console.log("Triggered login")
    event.preventDefault();
    login({ username, password });
  };


  return (
    <div className="sign-in-container">
      <Box
        sx={{
          width: 1,
          height: .95,
          border: 1,
          borderColor: "#212121",
          borderWidth: "3px",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Campfire</h1>
        <div className="sign-in-input-container">
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
            label="Password"
            value={password}
            size="small"
            variant="outlined"
            onChange={handlePasswordInput}
          />
          <Button
            className="forgot-password-button"
            size="medium"
            disableRipple={true}
            variant="text"
            sx={{
              backgroundColor: "transparent",
              textTransform: "none",
              color: "#BEBEBE",
            }}
          >
            Forgot Password?
          </Button>
        </div>
        <div className="login-buttons-container">
          <div className="button-container">
            <Button disableElevation fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#ee7e00",
              }}
              onClick={triggerLogin}
            >
              Login
            </Button>
          </div>
          <div className="button-container">
            <Button disableElevation fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#f14726"
              }}
            >
              Create an Account
            </Button>
          </div>
        </div>
        <div>
          <h2>- OR -</h2>
          <h5>Login with</h5>
        </div>
        <div className="brand-login-container">
          <Grid container spacing={2} id="gridContainer">
            <Grid item>
              <FontAwesomeIcon
                icon={faGoogle}
                style={{ height: "40px" }}
              ></FontAwesomeIcon>
            </Grid>
            <Grid item>
              <FontAwesomeIcon
                icon={faFacebook}
                style={{ height: "40px" }}
              ></FontAwesomeIcon>
            </Grid>
            <Grid item>
              <FontAwesomeIcon
                icon={faApple}
                style={{ height: "40px" }}
              ></FontAwesomeIcon>
            </Grid>
          </Grid>
        </div>
      </Box>
    </div >
  );
};

export default SignInComp;
