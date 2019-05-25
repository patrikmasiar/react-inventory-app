
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import ENV from '../.env';

const networkInterface = createNetworkInterface({
  uri: ENV.API_URL
});
  
export default new ApolloClient({
  networkInterface,
  addTypename: true,
  queryDeduplication: false,
  dataIdFromObject: result => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  },
});