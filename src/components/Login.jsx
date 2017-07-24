/* eslint-env browser */
/* eslint react/prop-types: 0 */

import React from 'react';

export default class Login extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      this.props.history.push('/user');
    }
  }

  render() {
    return (
      <div id="login">
        <h1>Note Pad</h1>
        <p>A place to write about your memories, passions and goals.</p>
        <a href="https://vinnieking06.auth0.com/authorize?audience=https://vinnieking06.auth0.com/api/v2/&scope=openid&response_type=token&client_id=OaxoFFEBwMQbEcLlERTltCHUEUSn5eYp&redirect_uri=https://stc-notepad.herokuapp.com/user">
          <button>Sign in</button>
        </a>
      </div>
    );
  }
}
