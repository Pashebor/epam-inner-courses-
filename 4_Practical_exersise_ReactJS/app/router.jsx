'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';

import App from './blog-page/RacoonApp.jsx';
import CreateArticle from './blog-forms/form-create.jsx';
import EditArticle from './blog-forms/form-edit.jsx';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App}/>
        <Route path='create_article' component={CreateArticle}/>
        <Route path='edit_article/:articleId' component={EditArticle}/>
    </Router>, document.getElementById('app'));