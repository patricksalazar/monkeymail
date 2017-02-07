import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import agent from './agent';
// import history from 'history';
import store from './store';

import App from './components/App';
import Article from './components/Article';
import Editor from './components/Editor';
// import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileFavorites from './components/ProfileFavorites';
import Register from './components/Register';
import Settings from './components/Settings';
import AuthorizationContainer from './components/auth/AuthorizationContainer'
import Authorize from './components/auth/Authorize'

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="authorize" component={Authorize} />
        <Route component={AuthorizationContainer} >
          <Route path="editor" component={Editor} />
          <Route path="editor/:slug" component={Editor} />
          <Route path="article/:id" component={Article} />
          <Route path="settings" component={Settings} />
          <Route path="@:username" component={Profile} />
          <Route path="@:username/favorites" component={ProfileFavorites} />
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
