export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                token: action.payload.getAccessToken().getJwtToken(),
                isAuthenticated: true,
                username: action.payload.accessToken.payload.username,
                loading: false
            };
        case "LOGIN_FAILURE":
        case "LOGOUT":
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                username: null,
                error: action.payload
            };
        default:
            return state;
    }
};