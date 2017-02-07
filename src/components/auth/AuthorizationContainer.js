import React from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

// import { SET_REDIRECT_URL, AUTHORIZE } from '../../redux/actions/actionTypes';
// import {refreshAccessToken} from '../../routes/auth/microsoft/authHelper';
// import actions from '../../redux/actions';

class AuthorizationContainer extends React.Component {
  componentWillMount() {
    console.log("AuthorizationContainer");
    let token;
    if (this.props.token) {
      token = this.props.token;
    }else {
      token = cookie.load('automail-token');
    }
    if (token) {
      console.log("token:"+token);
      // let expiration = cookie.load('automail-token-expires');
      // if (expiration <= new Date()) {
      //   let refresh_token = cookie.load('automail-token-refresh');
      //   refreshAccessToken(refresh_token, function(error, newToken) {
      //     if (error) {
      //       token = null;
      //       isLoggedIn = false;
      //     }else if (newToken) {
      //       token = token.access_token;
      //       cookie.save('automail-token', newToken.token.access_token, {'maxAge': 4000});
      //       cookie.save('automail-refresh-token', newToken.token.refresh_token, {'maxAge': 4000});
      //       cookie.save('automail-token-expires', newToken.token.expires_at.getTime(), {'maxAge': 4000});
      //       isLoggedIn = true;
      //     }
      //     if (token != null) actions.getUser(token);
      //     console.log("authorize, token:"+token);
      //     this.props.authorize(token, isLoggedIn);
      //   });
      // }
    }
  }

  componentDidMount() {
    const { currentURL } = this.props;

    if (!this.props.currentUser) {
      // let expiration = new Date(parseFloat(cookie.load('automail-token-expires')));
      // if (expiration > new Date()) {
      // }

      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      console.log("currentURL:"+currentURL);
      this.props.setRedirectUrl(currentURL);
      browserHistory.replace("login");
    }

  }

  render() {
    if (this.props.currentUser) {
      return this.props.children
    } else {
      return null
    }
  }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
  return {
    ...state.auth,
    ...state.common,
    currentURL: ownProps.location.pathname
  }
}

const mapDispatchToProps = dispatch => ({
  authorize: (token, isLoggedIn) =>
    dispatch({ type: 'AUTHORIZE', token, isLoggedIn}),
  setRedirectUrl: url =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'redirectUrl', url })
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationContainer);