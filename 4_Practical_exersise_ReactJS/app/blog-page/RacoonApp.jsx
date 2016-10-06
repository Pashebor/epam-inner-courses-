'use strict';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import $ from 'jquery';

import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';

import Blog from './Blog.jsx';
import SideBar from './SideBar.jsx';

let dataArticles, dataTags;

let getArticles = () => {

    console.log('called');
    let dataObjectArticles = {};

    const articles = (dataToShare = dataObjectArticles) => {
        dataToShare = $.ajax({url: '/articles', dataType: 'json', type: 'GET', async: false}).responseJSON;
        return dataToShare;
    };

    let data = articles();
    return data;
};


// let getTags = () => {
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

class App extends Component{
    render() {

        let dataOfArticles = dataArticles;
        let dataOfTags = dataTags;

        return (
            <div className="container">
                <Blog data={dataOfArticles}/>
                <SideBar />
            </div>
        )
    }
}





export default App;
