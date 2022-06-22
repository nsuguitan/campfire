import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField, Box } from "@mui/material";
import { Button } from "@mui/material";
import "./SignIn.css";
const SignInComp = () => {
  return (
    <div className="sign-in-container">
      <Box
        sx={{
          width: 1,
          height: 1,
          border: 1,
          borderColor: "#212121",
          borderWidth: "3px",
        }}
      >
        <h1>Campfire</h1>
        <div className="sign-in-input-container">
          <TextField
            fullWidth
            className="sign-in-field"
            label="Username"
            size="small"
            variant="outlined"
          />
          <TextField
            fullWidth
            className="sign-in-field"
            label="Password"
            size="small"
            variant="outlined"
          />
          <Button
            className="forgot-password-button"
            size="medium"
            disableRipple={true}
            variant="text"
            style={{
              backgroundColor: "transparent",
              textTransform: "none",
              color: "#BEBEBE",
            }}
          >
            Forgot Password?
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default SignInComp;
