import axios from 'axios';

import constants from '../constants';

let _token;
function setToken(token) {
  _token = token;
}

function getHeaders(token) {
  return {
    // Add the access token to the request
    'Authorization': 'Bearer ' + token,
    // Set a request ID (helpful for troubleshooting)
    // 'client-request-id': guid(),
    // Request that the client request ID be returned
    'return-client-request-id': `true`
  }
}

function getUserEmail(token) {
  console.log("getUserEmail");
  let query = {
    '$select': 'DisplayName, EmailAddress',
    // '',
  };
  let header = getHeaders(token);
  return axios.get(constants.microsoft.endpoint+'/Me?'+query, { header })
    .then((result) => {
      console.log("Result: "+ JSON.stringify(result));
      setToken(token);
      // TODO set local token
      return result;
    }).catch((error) => {
      console.error("Error in login:"+error.message);
      return error;
    });
}

export default {
  setToken,
  getHeaders,
  getUserEmail,
};
