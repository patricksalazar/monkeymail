import React from 'react';
import { connect } from 'react-redux';

import authHelper from '../../utils/authHelper';

const mapDispatchToProps = dispatch => ({
  login: (code) =>
    dispatch({ type: 'MS_LOGIN', payload: authHelper.authorize(code) }),
  setErrors: errors =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'errors', errors }),
});

const mapStateToProps = state => ({
  ...state.auth
});

class Authorize extends React.Component {
  componentWillMount() {
    console.log("componentWillMount");
    let query = this.props.location.query;
    let code = query.code;
    console.log("code:"+code);

    this.props.login(code);
    // authHelper.authorize(code)
    //   .then((user) => {
    //     this.props.login(user, null);
    //   })
    //   .catch((error) => {
    //     this.props.login(null, error);
    //   });
  }

  render() {
    console.log("Authorize");
    return (
      <div>
        <h1>Success</h1>
        <p>Code: {this.props.location.query.code}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorize);
