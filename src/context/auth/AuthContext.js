import { createContext, useReducer, useContext } from 'react'
import 'cross-fetch/polyfill';
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { CognitoUser } from "amazon-cognito-identity-js"
import { authReducer } from "./AuthReducer"

const Auth = createContext();

const AuthContext = ({ children }) => {

    const initialState = {
        token: '',
        isAuthenticated: false,
        loading: true,
        username: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = userData => {
        console.log(userData)
        console.log("process env", process.env.REACT_APP_KEY)
        // const user = new CognitoUser({
        //     Username: userData.username,
        //     Pool: process.env.CONGITO_USER_POOL_ID,
        // });
    };
    return (
        <Auth.Provider value={{
            // token: state.token,
            // isAuthenticated: state.isAuthenticated,
            // loading: state.loading,
            // username: state.username,
            // error: state.error,
            //register,
            login
            //logout,
            //onLoad
            //clearErrors
        }}>{children}</Auth.Provider>
    )

};

export default AuthContext;

export const AuthState = () => {
    return useContext(Auth);
};