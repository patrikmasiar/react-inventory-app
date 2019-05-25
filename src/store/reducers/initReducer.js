const initialState = {
  appIsReady: false,
};
  
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_APP_IS_READY':
      return {
        ...state,
        appIsReady: true,
      }
    default:
      return state
  }
};
  