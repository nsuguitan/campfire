import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { AuthState } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import OAuth from "../OAuth/OAuth";
import "./SignIn.css";
import AuthInput from "../AuthInput/AuthInput";
const SignInComp = () => {
  let navigate = useNavigate();

  const [textFields, setTextFields] = useState({
    username: "",
    password: "",
  });
  const { login, isAuthenticated } = AuthState();

  const handleTextChange = (e) =>
    setTextFields({
      ...textFields,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const triggerLogin = async (event) => {
    event.preventDefault();
    await login(textFields).then(() => {
      navigate("/Newsfeed");
    });
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

          <Button
            className="forgot-password-button"
            size="medium"
            disableRipple={true}
            variant="text"
            sx={{
              backgroundColor: "transparent",
              textTransform: "none",
              color: "var(--campfire-orange)",
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
