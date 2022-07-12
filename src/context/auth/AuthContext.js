import { createContext, useReducer, useContext, useEffect } from "react";
import "cross-fetch/polyfill";
import AmazonCognitoIdentity from "amazon-cognito-identity-js";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import { authReducer } from "./AuthReducer";
import UserPool from "../../config/UserPool";

//https://github.com/aws-amplify/amplify-js/tree/main/packages/amazon-cognito-identity-js

const Auth = createContext();

const AuthContext = ({ children }) => {
  const initialState = {
    token: "",
    isAuthenticated: false,
    loading: true,
    username: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (userData) => {
    const user = new CognitoUser({
      Username: userData.username,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: userData.username,
      Password: userData.password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
      },
      onFailure: (err) => {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
      },
    });
    return true;
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
        let cognitoUser = result.user;
      }
    );
    return true;
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
        //logout,
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
