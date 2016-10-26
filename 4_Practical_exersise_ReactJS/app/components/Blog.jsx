'use strict';

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Link } from 'react-router';
import Article from './Article.jsx';
import { connect } from 'react-redux';
import {getArticles, filterAction} from './../actions/index.js';
import {filterSearch} from '../controllers/searchFilter.function';


class Blog extends Component {

    componentDidMount() {
        if (this.props.articles.length === 0) {
            this.props.dispatch(getArticles());
        }
    }


    searchHandler (e) {
      e.preventDefault();
      this.props.dispatch(filterAction(e.target.value));
    }

    render() {

        let listArticles = filterSearch(this.props.articles, this.props.filterState);

        return (
            <main role="main" className="blog">

            <div className="create-and-search">
            <Link to="/blog_editor/"  className="btn btn-info btn-submit btn-submit--create-article">create</Link>
            <input type="search" id="searchInput"  placeholder='Search' value={this.props.filterState}  className="form-control" onChange={this.searchHandler.bind(this)} />
            </div>
                {listArticles.reverse().map((article, i) => {return <Article data={article} key={i}/>})}
            <div className="spinner-block"><img src="images/loading.png" className="spinner-block__spinner"/></div>
            </main>
        );
    }

}

function mapStateToProps (store) {
    return {
        filterState: store.filterState,
        articles: store.blogState
    }
}

export default connect(mapStateToProps)(Blog);
