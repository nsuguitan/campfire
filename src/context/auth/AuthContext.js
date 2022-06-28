import { createContext, useReducer, useContext, useEffect } from 'react'
import 'cross-fetch/polyfill';
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"
import { authReducer } from "./AuthReducer"
import UserPool from '../../config/UserPool';

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

    useEffect(() => {
        console.log('auth state', state);
    }, [state]);

    const login = userData => {
        console.log(userData)
        console.log("process env", process.env.REACT_APP_KEY)

        const user = new CognitoUser({
            Username: userData.username,
            Pool: UserPool,
        });

        const authDetails = new AuthenticationDetails({
            Username: userData.username,
            Password: userData.password
        });

        user.authenticateUser(authDetails, {
            onSuccess: data => {
                dispatch({ type: "LOGIN_SUCCESS", payload: data });
            },
            onFailure: err => { dispatch({ type: "LOGIN_FAILURE", payload: err }) },
        }
        );

    };
    return (
        <Auth.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            username: state.username,
            error: state.error,
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