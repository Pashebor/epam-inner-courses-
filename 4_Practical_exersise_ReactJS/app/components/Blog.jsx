'use strict';

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';
import Article from './Article.jsx';
import store from '../store.js';
import { connect } from 'react-redux';

class Blog extends Component {

    render() {
      console.log(this.props);
        let listArticles = this.props.store.blogState.map(function(article, i) {
            return(
                <Article data={article} key={i}/>
            )
        });
        return (
            <main role="main" className="blog">

            <div className="create-and-search">
            <Link to="/blog_editor/"  className="btn btn-info btn-submit btn-submit--create-article">create</Link>
            <input type="search" id="searchInput" placeholder="Search" className="form-control"  />
            </div>
            {listArticles}
            <div className="spinner-block"><img src="images/loading.png" className="spinner-block__spinner"/></div>
            </main>
        );
    }

}

function mapStateToProps (store) {
    return {
        store: store
    }
}

export default connect(mapStateToProps)(Blog);
