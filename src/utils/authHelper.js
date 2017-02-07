import constants from '../constants';
const oauth2 = require('simple-oauth2').create(constants.microsoft.credentials);

let redirectUri = 'http://localhost:3000/authorize';

function getAuthUrl() {
  console.log("in getAuthUrl");
  let returnVal = oauth2.authorizationCode.authorizeURL({
    redirect_uri: redirectUri,
    scope: constants.microsoft.scopes.join(' ')
  });
  console.log('Generated auth url: ' + returnVal);
  return returnVal;
}

module.exports = {
  getAuthUrl,
};
