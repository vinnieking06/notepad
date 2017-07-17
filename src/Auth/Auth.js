import auth0 from 'auth0-js';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'vinnieking06.auth0.com',
      clientID: 'OaxoFFEBwMQbEcLlERTltCHUEUSn5eYp',
      redirectUri: 'http://localhost:5000',
      audience: 'https://vinnieking06.auth0.com/api/v2/',
      responseType: 'token id_token',
      scope: 'openid',
    });
  }
  login() {
    this.auth0.authorize();
  }
}
