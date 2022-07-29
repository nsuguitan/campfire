import FB from '../../assets/fb.jpg';
import Insta from '../../assets/ig.jpg';
import Twitter from '../../assets/twitter.jpg';
import '../SignIn/SignIn.css'

const OAuth = () => {
  return (
    <div className="oauth-container">
      <div>
      <div class="separator">
        <div class="line"></div>
          <h3> OR </h3>
        <div class="line"></div>
        </div>
        <h5>Login with</h5>
      </div>
      <div className="brand-login-container">
            <img src={FB}/>
            <img src={Insta}/>
            <img src={Twitter}/>
      </div>
    </div>
  );
};

export default OAuth;
