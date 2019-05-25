import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { persistStore } from 'redux-persist';
//components
import App from './App';
//env
import ENV from './.env';
//helpers
import store from './store';
import client from './utils/apolloClient';
import { setAppIsReady } from './store/actions';
import './index.css';
import * as serviceWorker from './serviceWorker';

persistStore(
  store,
  {
    whitelist: ENV.PERSISTED_REDUCERS,
  },
  () => {
    store.dispatch(setAppIsReady())
  },
);

const Application = () => {
  return (
    <ApolloProvider client={ client } store={ store }>
      <App />
    </ApolloProvider>
  );
};
  

ReactDOM.render(<Application />, document.getElementById('root'));
serviceWorker.unregister();
