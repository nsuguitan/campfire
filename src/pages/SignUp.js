import SignUpComp from "../components/SignUp/SignUp";
import Logo from '../assets/logo.jpg';

const SignUp = () => {
    return (
        <div className="signInPage">
            <div className="signInContainer">
                <div className='col col1 logoCol'>
                    <img src={Logo} />
                </div>
                <div className='col col2'>
                    <SignUpComp />
                </div>
            </div>
        </div>
    );
};
export default SignUp;