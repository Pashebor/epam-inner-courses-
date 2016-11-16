'use strict';

import {render} from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import { Router, Route,  browserHistory, Link } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/RacoonApp.jsx';
import BlogEditor from './components/Forms.jsx';
import middleWare from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(middleWare));


render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path='/' component={App}/>
        <Route path='/blog_editor/:id' component={BlogEditor}/>
        <Route path='/blog_editor/' component={BlogEditor}/>
    </Router>

  </Provider>, document.getElementById('app'));
