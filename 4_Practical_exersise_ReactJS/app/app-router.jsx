'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route,  browserHistory, Link } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/RacoonApp.jsx';
import BlogEditor from './components/Forms.jsx';
import store from './store.js';
// import EditArticle from './blog-forms/form-edit.jsx';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path='/' component={App}/>
        <Route path='/blog_editor/' component={BlogEditor}/>
        <Route path='/blog_editor/:id' component={BlogEditor}/>
    </Router>
  </Provider>, document.getElementById('app'));
