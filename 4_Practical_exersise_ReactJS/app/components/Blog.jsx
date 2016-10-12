'use strict';

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';
import Article from './Article.jsx';
import { connect } from 'react-redux';
import $ from 'jquery';
import {getArticles} from './../actions/index.js';

class Blog extends Component {
    componentDidMount() {

        if (this.props.store.blogState[0] === undefined) {
          $.ajax({url: '/articles', dataType: 'json', type: 'GET', async: true}).done(response => {
            this.props.dispatch(getArticles(response));
        });
      }

    }
    render() {

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
