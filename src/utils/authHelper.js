import cookie from 'react-cookie';
import promisify from 'es6-promisify';

import constants from '../constants';
const oauth2 = require('simple-oauth2').create(constants.microsoft.credentials);

import microsoft from '../actions/microsoft';

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

const getToken = promisify(oauth2.authorizationCode.getToken);
const getUserInfo = promisify(microsoft.login);
async function authorize(auth_code) {
  console.log("authorize code="+auth_code);

  try {
    let token = await getToken(auth_code);
    console.log("Token: "+JSON.stringify(token));
    let user =  await getUserInfo(token);
    console.log("user: "+JSON.stringify(user));
    if (user) {
      // set cookies
      console.log("Save cookies");
      cookie.save('automail-token', token.access_token, {'maxAge': 4000});
      cookie.save('automail-refresh-token', token.refresh_token, {'maxAge': 4000});
      cookie.save('automail-token-expires', token.expires_at.getTime(), {'maxAge': 4000});
      cookie.save('node-tutorial-email', user.email, {'maxAge': 4000});
    }
    return user;
  }catch (e) {
    console.error("An error occurred: "+e);
    return e;
  }
}

// function getTokenFromCode(auth_code) {
//   console.log("getTokenFromCode");
//   oauth2.authorizationCode.getToken({
//     code: auth_code,
//     redirect_uri: redirectUri,
//     scope: constants.microsoft.scopes.join(' ')
//   }, function (error, result) {
//     if (error) {
//       console.log('Access token error: ', error.message);
//       callback(response, error, null);
//     }else {
//       let token = oauth2.accessToken.create(result);
//       console.log('Token created: ', token.token);
//       callback(response, null, token);
//     }
//   });
// }


module.exports = {
  authorize,
  getAuthUrl,
};
