/*eslint-disable */

import React from 'react';
import Auth from './../Auth/Auth'

export default class Login extends React.Component {

  showLogin() {
    const auth = new Auth()
    const token = localStorage.getItem('access_token');
    console.log(token)
    auth.login();
  }

  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      this.props.history.push('/user');
    }
  }

  render() {
    return (
      <div>
        <a href="https://vinnieking06.auth0.com/authorize?audience=https://vinnieking06.auth0.com/api/v2/&scope=openid&response_type=token&client_id=OaxoFFEBwMQbEcLlERTltCHUEUSn5eYp&redirect_uri=http://localhost:5000/user">
        sign in
        </a>
      </div>
    )
  }
}