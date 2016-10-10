'use strict';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import store from '../dispatcher/store.js';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';

import Blog from './Blog.jsx';
import SideBar from './SideBar.jsx';

let dataArticles, dataTags, dataSingleArticle;

const getArticles = () => {

    let dataObjectArticles = {};
    let allTags = [];

    const articles = (dataToShare = dataObjectArticles) => {
        dataToShare.articles = $.ajax({url: '/articles', dataType: 'json', type: 'GET', async: false}).responseJSON;

        dataToShare.articles.forEach(function (article) {
          let tags = article.tags;
          tags.forEach(function(tag) {
            if (allTags.indexOf(tag.trim()) === -1) {
              allTags.push(tag);
            }
          });
        });

        dataToShare.tags = allTags;

        return dataToShare;
    };

    let data = articles();
    return data;
};



const getSingleArticle = (id) => {
  let dataObjectArticles = {};
  const article = (dataToShare = dataObjectArticles) => {
    dataToShare.article = $.ajax({url: '/articles_data/' + id, dataType: 'json', type: 'GET', async: true}).responseJSON;
    return dataToShare;
  }

  let data = article();
};
// const getTags = () => {
//     let dataObjectTags = {};
//
//     const tags = (dataToShare = dataObjectTags) => {
//         dataToShare.tags = $.ajax({url: '/tags', dataType: 'json', type: 'GET', async: false}).responseJSON;
//         return dataToShare.tags;
//     };
//     let data = tags();
//     return data;
// };

dataArticles = getArticles();
dataSingleArticle = getSingleArticle();

class App extends React.Component{

  constructor(state, context) {
    super(state, context);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios.get('/articles').then(response => {
    this.setState({data: response.data});
  });
}

    render() {

        let dataOfArticles = dataArticles;
        store.dispatch({type: 'ALL_ARTICLES', data: this.state.data});
        console.log(store.getState());
        return (
            <div className="container">
                <Blog data={this.state.data}/>
                <SideBar data={dataOfArticles}/>
            </div>
        )
    }
}


export default App;
