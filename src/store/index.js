import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {
 initReducer, userReducer, companyReducer
} from './reducers'
import { autoRehydrate } from 'redux-persist';
//import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import client from '../utils/apolloClient';

//import Sagas from './sagas'
//const sagaMiddleware = createSagaMiddleware();

export const history = createHistory();
const reactRouterMiddleware = routerMiddleware(history);

export default createStore(
  combineReducers({
    apollo: client.reducer(),
    init: initReducer,
    router: routerReducer,
    user: userReducer,
    company: companyReducer,
  }),
  {},
  compose(
    applyMiddleware(client.middleware(), reactRouterMiddleware),
    autoRehydrate(),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
)

//sagaMiddleware.run(Sagas)
