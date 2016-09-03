'use strict';
import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';

/*
let dataObjectArticles = {};
let dataObjectTags = {};

const getArticles = function (dataToShare = dataObjectArticles){
    dataToShare.articles = $.ajax({url: '/articles', dataType: 'json', type: 'GET', async: false}).responseJSON;
    return dataToShare.articles;
};

const getTags = function (dataToShare = dataObjectTags){
    dataToShare.tags = $.ajax({url: '/tags', dataType: 'json', type: 'GET', async: false}).responseJSON;
};

let data = getArticles();
*/


const App = React.createClass({
    getArticles:  () => {
        let dataObjectArticles = {};

        const articles = (dataToShare = dataObjectArticles) => {
            dataToShare.articles = $.ajax({url: '/articles', dataType: 'json', type: 'GET', async: false}).responseJSON;
            return dataToShare.articles;
        };

        let data = articles();
        return data;
    },
    getTags: () => {

        let dataObjectTags = {};

        const tags = (dataToShare = dataObjectTags) => {
            dataToShare.tags = $.ajax({url: '/tags', dataType: 'json', type: 'GET', async: false}).responseJSON;
            return dataToShare.tags;
        };
        let data = tags();
        return data;
    },
    render: function() {

        let dataOfArticles = this.getArticles();
        let dataOfTags = this.getTags();

         return (
             <div className="container">
                 <StartPageBlog data={dataOfArticles}/>
                 <StartPageSideBar data={dataOfTags} />
             </div>
         )
    }
});



const StartPageBlog = React.createClass({
        render: function () {
            let listArticles = this.props.data.map(function(article) {
                return(
                   <ArticleRow data={article} key={article.id}/>
                )
            });
            return (
                <main role="main" className="blog">
                    <div className="create-and-search">
                        <a href="#/ass" role="link" className="btn btn-info btn-submit btn-submit--create-article">create</a>
                        <input type="search" id="searchInput" placeholder="Search" className="form-control"  />
                    </div>
                    {listArticles}
                    <div className="spinner-block"><img src="assets/img/loading.png" className="spinner-block__spinner"/></div>
                </main>
            );
        }

});

const StartPageSideBar = React.createClass({displayName: 'SideBar',
    render: function() {
        let listTags = this.props.data.map(function (tag, i) {
              return(
                  <Tag data={tag} key={i}/>
              )
        });
        return(
            <aside role="complementary" className="sidebar">
                <article className="sidebar-hint" role="article">
                    <h3 className="sidebar-hint__header sidebar-hint__header--exclamation" role="heading">about</h3>
                    <p className="sidebar-hint__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </article>
                <article className="sidebar-hint" role="article">
                    <h3 className="sidebar-hint__header sidebar-hint__header--question" role="heading">some information</h3>
                    <p className="sidebar-hint__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </article>
                <ul className="hot-hashtags" role="presentation">
                    {listTags}
                </ul>
            </aside>
        );
    }
});

const ArticleRow = React.createClass({
    render: function () {
        return (
            <article role="article" className="blog-article"  id={this.props.data.id}>
                <figure className="image-block" role="img">
                    <img className="image-block__picture" src={this.props.data.image} alt="Blogoflowers" title="Blogoflowers"/>
                </figure>
                <h2 className="blog-article__description"><a href="/articles" className="blog-article__description-link" role="link">{this.props.data.header}</a></h2>
                <footer className="blog-article__info" role="contentinfoo">
                    <time role="alert" className="blog-article__date"><span><svg  role="img" className="blog-article__date-icon"><use /></svg></span>{this.props.data.time}</time>
                    <address className="blog-article__author"><span><svg  role="img" className="blog-article__author-icon"><use /></svg></span>{this.props.data.author}</address>
                    <div className="social">
                        <ul className="social__group">
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">Facebook share</span><svg  role="img" className="social__group-item-icon"><use /></svg>16</a></li>
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">G+ share</span><svg  role="img" className="social__group-item-icon"><use /></svg>7</a></li>
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">Twitter share</span><svg  role="img" className="social__group-item-icon"><use /></svg>15</a></li>
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">VK share</span><svg  role="img" className="social__group-item-icon"><use /></svg>16</a></li>
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">Yaru share</span><svg  role="img" className="social__group-item-icon"><use /></svg>1</a></li>
                        </ul>
                    </div>
                </footer>
                <p className="blog-article__note">{this.props.data.text}</p>
            </article>
        )
    }
});

const Tag = React.createClass({
      render: function () {
          return(
              <li className="hot-hashtags__item"  ><span className="hot__hashtags-item__link"><span className="screen-reader-text">link</span>{this.props.data}</span></li>

          )
      }
});

ReactDOM.render(<App name="app"/>, document.getElementById('app'));



/*var CommentBox = React.createClass({

    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data} />
            </div>
        );
    }
});



var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox data={data} />,
    document.getElementById('app')
);*/

