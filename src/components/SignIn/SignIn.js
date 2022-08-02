import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { AuthState } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import OAuth from "../OAuth/OAuth";
import "./SignIn.css";
import AuthInput from "../AuthInput/AuthInput";
import Pasword from '../../assets/password.jpg';
import User from '../../assets/username.jpg';


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
      <Box >
        <div className='signConatiner1'>
          <h1>Log in at your own risk...</h1>
          <div className="sign-in-input-container">
            <div className='signInField'>
              <div>
              <img src={User} style={{width: '30px', marginRight: '10px'}}/>
              </div>
              <AuthInput
              name="username"
              label="Username"
              value={textFields.username}
              onChange={handleTextChange}
              />
            </div>
            <div className='signInField'>
              <div>
              <img src={Pasword} style={{width:'30px', marginRight: '10px'}}/>
              </div>
              <AuthInput
              name="password"
              label="Password"
              type='password'
              value={textFields.password}
              onChange={handleTextChange}
              />
            
            </div>
          </div>
          <div className="login-buttons-container">
            <div className="button-container">
              <Button
                disableElevation
                fullWidth
                sx={{
                  backgroundColor: "var(--campfire-orange)",
                  width: '70%',
                  color: 'var(--campfire-white)',
                  fontFamily: 'Quicksand',
                  marginBottom: '10px'
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
                  fontFamily: 'Quicksand'
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
