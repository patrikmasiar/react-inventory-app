import client from '../../../utils/apolloClient';
import {
  officeInfo as officeQuery,
} from 'queries';

export const retrieveOfficeName = async(officeId) => {
  try {

    const response = await client.query({
      query: officeQuery,
      variables: {id: officeId}, 
    });

    if(response && response.data.Office.id) {
      return response.data.Office.name;
    }
  
  } catch(error) {
    console.log('Error retrieve office info', error);
  }

  return '';
};