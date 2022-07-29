import FB from '../../assets/fb.jpg';
import Insta from '../../assets/ig.jpg';
import Twitter from '../../assets/twitter.jpg';

const OAuth = () => {
  return (
    <div className="oauth-container">
      <div>
        <h3>- OR -</h3>
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
