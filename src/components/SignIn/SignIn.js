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
      <Box>
        <div className='signConatiner1'>
          <h1>Log in at your own risk...</h1>
          <div className="sign-in-input-container">
            <AuthInput
              name="username"
              label="Username"
              value={textFields.username}
              onChange={handleTextChange}
              className='signInput'
            />
            <AuthInput
              name="password"
              label="Password"
              value={textFields.password}
              onChange={handleTextChange}
            />
          </div>
          <div className="login-buttons-container">
            <div className="button-container">
              <Button
                disableElevation
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "var(--campfire-orange)",
                  width: '70%'
                }}
                onClick={triggerLogin}
              >
                Login
              </Button>
              <Button
                className="forgot-password-button"
                size="medium"
                disableRipple={true}
                variant="text"
                sx={{
                  backgroundColor: "transparent",
                  textTransform: "none",
                  color: "var(--campfire-orange)",
                  width: '70%'
                }}
              >
                Forgot Password?
              </Button>
            </div>
          </div>
          <OAuth />
        </div>
        <div className='signConatiner2'>
          <div className="bottom-container">
            <p>Don't have an account?</p>
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
              sign up here
            </Button>
          </div>

        </div>
      </Box>
    </div>
  );
};

export default SignInComp;
