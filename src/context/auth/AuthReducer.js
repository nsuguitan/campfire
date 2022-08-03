import { userSetLoginCreds } from "../../services/UserLoginCreds";

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      userSetLoginCreds(action.payload.accessToken.payload.username);
      return {
        ...state,
        token: action.payload.getAccessToken().getJwtToken(),
        isAuthenticated: true,
        username: action.payload.accessToken.payload.username,
        loading: false,
      };
    case "LOGIN_FAILURE":
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        username: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
