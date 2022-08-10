import { TextField, Box, Modal } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { AuthState } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import OAuth from "../OAuth/OAuth";
import "./SignIn.css";
import AuthInput from "../AuthInput/AuthInput";
import Pasword from "../../assets/password.jpg";
import User from "../../assets/username.jpg";

const SignInComp = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "var(--campfire-dark-gray)",
    border: "2px solid var(--campfire-gray)",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [textFields, setTextFields] = useState({
    username: "",
    password: "",
  });
  const { forgotPass, resetPass, login, isAuthenticated } = AuthState();

  useEffect(() => {
    if (isAuthenticated) navigate("/Newsfeed");
  }, []);

  const handleTextChange = (e) =>
    setTextFields({
      ...textFields,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  const handleVerificationCode = (evt) => {
    setVerificationCode(evt.target.value);
  };
  const handleNewPassword = (evt) => {
    setNewPassword(evt.target.value);
  };

  const triggerPasswordReset = async (event) => {
    event.preventDefault();
    //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#confirmSignUp-property
    let params = {
      ClientId: "4gjkaose7v4olc8mvsd40nf11f",
      ConfirmationCode: verificationCode,
      User: textFields.username,
      Password: newPassword,
    };
    const successfulReset = await resetPass(params);
  };
  // const isCorrect = () => {
  //   //check inputs
  //   //future feat. make this check the actual error code and run it in the next function
  // }

  const triggerLogin = async (event) => {
    //runs if correct inputs
    // const result = isCorrect();
    try {
      event.preventDefault();
      await login(textFields).then(() => {
        navigate("/Newsfeed");
      });
    } catch (err) {
      window.alert("username or password is incorrect");
    }
  };

  return (
    <div className="sign-in-container">
      <Box>
        <div className="signConatiner1">
          <h1>Log in at your own risk...</h1>
          <div className="sign-in-input-container">
            <div className="signInField">
              <div>
                <img
                  src={User}
                  style={{ width: "30px", marginRight: "10px" }}
                />
              </div>
              <AuthInput
                name="username"
                label="Username"
                value={textFields.username}
                onChange={handleTextChange}
              />
            </div>
            <div className="signInField">
              <div>
                <img
                  src={Pasword}
                  style={{ width: "30px", marginRight: "10px" }}
                />
              </div>
              <AuthInput
                name="password"
                label="Password"
                type="password"
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
                  width: "70%",
                  color: "var(--campfire-white)",
                  fontFamily: "Quicksand",
                  marginBottom: "10px",
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
                  fontFamily: "Quicksand",
                }}
                onClick={() => {
                  forgotPass(textFields.username);
                  setOpen(true);
                }}
              >
                Forgot Password?
              </Button>
            </div>
          </div>
          <OAuth />
        </div>
        <div className="signConatiner2">
          <div className="bottom-container">
            <p>Don't have an account?</p>
            <Button
              disableElevation
              sx={{
                backgroundColor: "transparent",
                textTransform: "none",
                color: "var(--campfire-orange)",
                width: "130px",
                fontFamily: "Quicksand",
                fontSize: "1em",
              }}
              onClick={() => navigate("/SignUp")}
            >
              sign up here
            </Button>
          </div>
        </div>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ ...style, width: 400 }}>
          <h2> Password Reset</h2>
          <TextField
            fullWidth
            label="Verification Code"
            value={verificationCode}
            size="small"
            variant="outlined"
            onChange={handleVerificationCode}
            sx={{
              marginBottom: "10px",
              border: "1px solid var(--campfire-gray)",
              backgroundColor: "var(--campfire-dark-gray)",
              color: "white",
            }}
            inputProps={{ style: { color: "var(--campfire-white" } }}
          />
          <TextField
            fullWidth
            label="New Password"
            value={newPassword}
            size="small"
            variant="outlined"
            onChange={handleNewPassword}
            sx={{
              marginBottom: "10px",
              border: "1px solid var(--campfire-gray)",
              backgroundColor: "var(--campfire-dark-gray)",
              color: "white",
            }}
            inputProps={{ style: { color: "var(--campfire-white" } }}
          />
          <Button
            onClick={triggerPasswordReset}
            styles={{
              color: "var(--campfire-white)",
              backgroundColor: "var(--campfire-orange)",
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SignInComp;
