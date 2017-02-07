import React from 'react';

class Authorize extends React.Component {
  componentWillMount() {
    console.log("componentWillMount");
    let query = this.props.location.query;
    console.log("query:"+query);
    let code = query.code;
    console.log("code:"+code);
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

export default Authorize;
