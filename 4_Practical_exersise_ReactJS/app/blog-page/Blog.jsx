'use strict';

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';

import Article from './Article.jsx';

class Blog extends Component {

    render() {
        let listArticles = this.props.data.map(function(article) {
            return(
                <Article data={article} key={article.id}/>
            )
        });
        return (
            <main role="main" className="blog">
            <div className="create-and-search">
            <Link to="create_article"  className="btn btn-info btn-submit btn-submit--create-article">create</Link>
            <input type="search" id="searchInput" placeholder="Search" className="form-control"  />
            </div>
            {listArticles}
            <div className="spinner-block"><img src="images/loading.png" className="spinner-block__spinner"/></div>
            </main>
        );
    }

}

export default Blog;
