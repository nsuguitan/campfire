//https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5

import { Navigate } from 'react-router-dom'
import { AuthState } from "../context/auth/AuthContext"

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = AuthState();
    console.log("Auth?", isAuthenticated);
    return (
        isAuthenticated ? children : <Navigate to="/SignIn" />
    )

};

export default PrivateRoute;