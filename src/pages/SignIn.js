import SignInComp from "../components/SignIn/SignIn";
import Logo from '../assets/logo.jpg';

const SignIn = () => {
  return (
    <div className="signInPage">
      <div className="signInContainer">
        <div className='col col1 logoCol'>
          <img src={Logo} />
        </div>
        <div className='col col2'>
          <SignInComp />
        </div>
      </div>
    </div>
  );
};
export default SignIn;
