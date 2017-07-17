/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.scss';
import configureStore from './redux/store';
import App from './components/App';
import Login from './components/Login';


const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/user" component={App} />
      </div>
    </Router>
  </Provider>,
    document.getElementById('root'),
);
