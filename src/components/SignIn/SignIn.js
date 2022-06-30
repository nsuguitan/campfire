import { TextField, Box } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { AuthState } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import OAuth from "../OAuth/OAuth";
import "./SignIn.css";
const SignInComp = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = AuthState();

  const handleUsernameInput = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePasswordInput = (evt) => {
    setPassword(evt.target.value);
  };

  const triggerLogin = async (event) => {
    event.preventDefault();
    const successfulLogin = await login({ username, password });
    if (successfulLogin) {
      setTimeout(() => {
        navigate("/Newsfeed");
      }, 1000);
    }
  };

  return (
    <div className="sign-in-container">
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
            <Button
              disableElevation
              fullWidth
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
            <Button
              disableElevation
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#f14726",
              }}
              onClick={() => navigate("/SignUp")}
            >
              Create an Account
            </Button>
          </div>
        </div>
        <OAuth />
      </Box>
    </div>
  );
};

export default SignInComp;
