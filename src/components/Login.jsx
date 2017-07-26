/* eslint-env browser */
/* eslint react/prop-types: 0 */
/* eslint class-methods-use-this: 0 */

import React from 'react';

export default class Login extends React.Component {

  componentDidMount() {
    if (this.checkToken()) {
      this.props.history.push('/user');
    }
  }

  checkToken() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt && localStorage.getItem('token') !== null;
  }

  render() {
    return (
      <div id="login">
        <h1>Note Pad</h1>
        <p>A place to write about your memories, passions and goals.</p>
        <a href="https://vinnieking06.auth0.com/authorize?audience=https://vinnieking06/api/v2/&scope=openid&response_type=token&client_id=OaxoFFEBwMQbEcLlERTltCHUEUSn5eYp&redirect_uri=http://localhost:5000/user">
          <button>Sign in</button>
        </a>
      </div>
    );
  }
}
