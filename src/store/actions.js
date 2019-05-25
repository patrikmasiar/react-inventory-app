// init Acrtions
export const SET_APP_IS_READY = 'SET_APP_IS_READY';

export const setAppIsReady = (ready) => ({
  type: SET_APP_IS_READY,
  payload: ready
});

// User actions
export const SET_LOGGED_USER = 'SET_LOGGED_USER';
export const RESET_LOGGED_USER = 'RESET_LOGGED_USER';
export const UPDATE_LOGGED_USER_NAME = 'UPDATE_LOGGED_USER_NAME';

export const setLoggedUser = user => ({
  type: SET_LOGGED_USER,
  payload: user,
});

export const updateLoggedUserName = user => ({
  type: UPDATE_LOGGED_USER_NAME,
  payload: user,
});

export const resetLoggedUser = () => ({
  type: RESET_LOGGED_USER,
  payload: null,
});

// Company actions
export const SET_LOGGED_COMPANY = 'SET_LOGGED_COMPANY';
export const RESET_LOGGED_COMPANY = 'RESET_LOGGED_COMPANY';
export const UPDATE_LOGGED_COMPANY = 'UPDATE_LOGGED_COMPANY';

export const setLoggedCompany = comapny => ({
  type: SET_LOGGED_COMPANY,
  payload: comapny,
});

export const updateLoggedCompany = company => ({
  type: UPDATE_LOGGED_COMPANY,
  payload: company,
});

export const resetLoggedCompany = () => ({
  type: RESET_LOGGED_COMPANY,
  payload: null,
});
