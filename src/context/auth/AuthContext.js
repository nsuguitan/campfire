import { createContext, useReducer, useContext } from "react";
import "cross-fetch/polyfill";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import { authReducer } from "./AuthReducer";
import UserPool from "../../config/UserPool";
import {
  userSetLoginCreds,
  userGetLoginCreds,
} from "../../services/UserLoginCreds";

//https://github.com/aws-amplify/amplify-js/tree/main/packages/amazon-cognito-identity-js

const Auth = createContext();

const AuthContext = ({ children }) => {
  const initialState = {
    token: "",
    isAuthenticated: userGetLoginCreds() === null ? false : true,
    loading: true,
    username: userGetLoginCreds(),
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user !== null) {
      user.signOut();
      dispatch({ type: "LOGOUT" });
    }
  };

  const login = async (userData) => {
    const user = new CognitoUser({
      Username: userData.username,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: userData.username,
      Password: userData.password,
    });
    return new Promise(function (resolve, reject) {
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          resolve(true);
          dispatch({ type: "LOGIN_SUCCESS", payload: data });
        },
        onFailure: (err) => {
          reject(false);
          dispatch({ type: "LOGIN_FAILURE", payload: err });
        },
      });
    });
  };

  const signup = (signUpData) => {
    let attributeList = [];
    let email = {
      Name: "email",
      Value: signUpData.email,
    };
    let name = {
      Name: "name",
      Value: signUpData.name,
    };
    let attributeEmail = new CognitoUserAttribute(email);
    let attributeName = new CognitoUserAttribute(name);

    attributeList.push(attributeEmail);
    attributeList.push(attributeName);

    UserPool.signUp(
      signUpData.username,
      signUpData.password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
      }
    );
    return true;
  };

  const forgotPass = (username) => {
    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });

    user.forgotPassword({
      onSuccess: function (data) {
        console.log("Forgot Pass request sent: ", data);
      },
      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  };
  const resetPass = (params) => {
    console.log("Username:", params);
    console.log("Pool:", UserPool);
    const user = new CognitoUser({
      Username: params.User,
      Pool: UserPool,
    });
    //Optional automatic callback
    const inputVerificationCode = () => {
      var verificationCode = params.ConfirmationCode;
      var newPassword = params.Password;
      user.confirmPassword(verificationCode, newPassword, {
        onSuccess() {
          window.location.reload();
          alert("Password change successful");
          return true;
        },
        onFailure(err) {
          alert(err.message || JSON.stringify(err));
          return;
        },
      });
    };
    inputVerificationCode();
  };

  const verify = (params) => {
    const user = new CognitoUser({
      Username: params.Username,
      Pool: UserPool,
    });

    user.confirmRegistration(
      params.ConfirmationCode,
      true,
      function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
      }
    );
    return true;
  };

  return (
    <Auth.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        username: state.username,
        error: state.error,
        signup,
        login,
        verify,
        logout,
        forgotPass,
        resetPass,
        //onLoad
        //clearErrors
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default AuthContext;

export const AuthState = () => {
  return useContext(Auth);
};
