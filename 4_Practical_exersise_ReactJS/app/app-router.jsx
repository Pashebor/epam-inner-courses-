'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';

import App from './blog-page/RacoonApp.jsx';
import BlogEditor from './blog-forms/form-create-edit.jsx';
// import EditArticle from './blog-forms/form-edit.jsx';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App}/>
        <Route path='/blog_editor/' component={BlogEditor}/>
        <Route path='/blog_editor/:id' component={BlogEditor}/>
    </Router>, document.getElementById('app'));
