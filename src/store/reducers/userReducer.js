const initialState = {
    loggedUserId: null,
    fullName: null,
    userRole: null,
    blocked: false,
};
    
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_USER':
            return {
                ...state,
                loggedUserId: action.payload.loggedUserId,
                fullName: action.payload.fullName,
                userRole: action.payload.userRole,
                blocked: action.payload.blocked,
            };
        case 'UPDATE_LOGGED_USER_NAME':
            return {
                ...state,
                fullName: action.payload.fullName,
            }
        case 'RESET_LOGGED_USER':
            return {
                ...state,
                loggedUserId: null,
                fullName: null,
                userRole: null,
                blocked: false,
            };
        default:
            return state
    }
};
    