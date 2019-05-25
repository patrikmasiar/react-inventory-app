const initialState = {
    companyId: null,
    companyName: null,
    companyAddressId: null,
    blocked: false,
};
    
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_COMPANY':
            return {
                ...state,
                companyId: action.payload.companyId,
                companyName: action.payload.companyName,
                companyAddressId: action.payload.companyAddressId,
                blocked: action.payload.blocked,
            };
        case 'UPDATE_LOGGED_COMPANY':
            return {
                ...state,
                companyName: action.payload.companyName,
                companyAddressId: action.payload.companyAddressId,
            }
        case 'RESET_LOGGED_COMPANY':
            return {
                ...state,
                companyId: null,
                companyName: null,
                companyAddressId: null,
                blocked: false,
            };
        default:
            return state
    }
};
    