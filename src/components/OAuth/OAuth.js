import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import { Grid } from "@mui/material";
const OAuth = () => {
  return (
    <div className="oauth-container">
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
    </div>
  );
};

export default OAuth;
