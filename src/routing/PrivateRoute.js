//https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5

import { Navigate, Outlet } from "react-router-dom";
import { AuthState } from "../context/auth/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated } = AuthState(true);

  return isAuthenticated ? <Outlet /> : <Navigate to="/SignIn" />;
};

export default PrivateRoute;
