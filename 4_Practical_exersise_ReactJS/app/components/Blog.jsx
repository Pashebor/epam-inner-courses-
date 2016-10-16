'use strict';

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';
import Article from './Article.jsx';
import { connect } from 'react-redux';
import $ from 'jquery';
import {getArticles} from './../actions/index.js';

class Blog extends Component {
   constructor(){
     super();
       this.state = {
           search: ''
       }

   }

    componentDidMount() {
            $.ajax({url: '/articles', dataType: 'json', type: 'GET', async: true}).done(response => {
                this.props.dispatch(getArticles(response));
            });
    }


    searchHandler (e) {
      e.preventDefault();
      this.setState({search: e.target.value});
    }

    render() {

        let tag = this.props.store.tagState.pop();
        let listArticles = this.props.store.blogState.filter( article => {
          if (this.state.search !== '') {
            return (article.author.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) ||
                   (article.id.indexOf(this.state.search) !== -1 ) ||
                   (article.text.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) ||
                   (article.tags.join(',').toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) ||
                   (article.header.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) ||
                   (article.tags.join(',').toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
                 }
          if (tag !== undefined) {
            let input = this.refs.searchInput; 
            input.value = tag.trim();
            return article.tags.join(',').toLowerCase().indexOf(tag.trim()) !== -1;
          } else {
             return true;
          }
        });

        return (
            <main role="main" className="blog">

            <div className="create-and-search">
            <Link to="/blog_editor/"  className="btn btn-info btn-submit btn-submit--create-article">create</Link>
            <input type="search" id="searchInput" ref='searchInput' placeholder='Search'  className="form-control" onChange={this.searchHandler.bind(this)} />
            </div>
            {listArticles.reverse().map((article, i) => {return <Article data={article} key={i}/>})}
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
