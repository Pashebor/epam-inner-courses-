'use strict';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
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
                        <Link to="create_article"  className="btn btn-info btn-submit btn-submit--create-article">create</Link>
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
                <h2 className="blog-article__description"><Link to="/edit_article" className="blog-article__description-link" role="link">{this.props.data.header}</Link></h2>
                <footer className="blog-article__info" role="contentinfoo">
                    <time role="alert" className="blog-article__date"><span><svg  role="img" className="blog-article__date-icon"><use xlinkHref='/assets/img/sprite.svg#icon-clock'/></svg></span>{this.props.data.time}</time>
                    <address className="blog-article__author"><span><svg  role="img" className="blog-article__author-icon"><use xlinkHref='/assets/img/sprite.svg#icon-footstep'/></svg></span>{this.props.data.author}</address>
                    <div className="social">
                        <ul className="social__group">
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">Facebook share</span><svg  role="img" className="social__group-item-icon"><use xlinkHref='/assets/img/sprite.svg#icon-facebook'/></svg>16</a></li>
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">G+ share</span><svg  role="img" className="social__group-item-icon"><use xlinkHref='/assets/img/sprite.svg#icon-gplus'/></svg>7</a></li>
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">Twitter share</span><svg  role="img" className="social__group-item-icon"><use xlinkHref='/assets/img/sprite.svg#icon-twitter'/></svg>15</a></li>
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">VK share</span><svg  role="img" className="social__group-item-icon"><use xlinkHref='/assets/img/sprite.svg#icon-vk'/></svg>16</a></li>
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">Yaru share</span><svg  role="img" className="social__group-item-icon"><use xlinkHref='/assets/img/sprite.svg#icon-yaru'/></svg>1</a></li>
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

          );
      }
});


const CreateArticle = React.createClass({
   render: () => {
       return(
           <form name="formCreate" className="form-block " >
               <h2 className="edit-article__header">Create an Article</h2>
               <div className="form-group">
                   <label htmlFor="author" className="form-block__label">Author</label>
                   <input type="text" id="author" className="form-control" placeholder="Enter your name" required />
               </div>
               <div className="form-group">
                   <label htmlFor="image_upd" className="form-block__label">Image</label>
                   <input type="text" id="image_upd" className="form-control" placeholder="URL of an image" />
               </div>
               <div className="form-group">
                   <label htmlFor="title" className="form-block__label">Title</label>
                   <input type="text" id="title" className="form-control" placeholder="Change title" required />
               </div>
               <div className="form-group">
                   <label htmlFor="text" className="form-block__label">Text</label>
                   <textarea className="form-control" rows="5" id="text" maxLength="100" required/>
               </div>
               <div className="form-group">
                   <label htmlFor="tags" className="form-block__label">Tags</label>
                   <input type="text" id="tags" className="form-control" placeholder="Enter tags"/>
               </div>
               <Link to="/" className="btn btn-danger btn-cancel" >cancel</Link>
               <input type="submit" className="btn btn-info btn-submit" value="save" />
           </form>
       );
   }
});

const EditArticle = React.createClass({
    render: () => {
      return(
    <form role="form" className="form-block"  name="formEdit">
        <h2 className="edit-article__header">Article Name</h2>
        
        <div className="form-group">
            <label htmlFor="author" className="form-block__label">Author</label>
            <input type="text" id="author" className="form-control" placeholder="" required />
            </div>
            <div className="form-group">
                <label htmlFor="image_upd" className="form-block__label">Image</label>
                <input type="text" id="image_upd" className="form-control" placeholder="URL of an image" />
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="form-block__label">Title</label>
                    <input type="text" id="title" className="form-control" placeholder="" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text" className="form-block__label">Text</label>
                        <textarea className="form-control" rows="5" id="text"  required placeholder=""/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags" className="form-block__label">Tags</label>
                        <input type="text" id="tags" className="form-control" placeholder="" />
                        </div>
                        <Link to="/" className="btn btn-warning btn-cancel" role="link">cancel</Link>
                        <input type="reset"  className="btn btn-danger btn-delete"  value="delete"/>
                            <input type="submit" className="btn btn-info btn-submit" value="save"  />
                            </form>
      );
    }
});


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App}/>
        <Route path='create_article' component={CreateArticle}/>
        <Route path='edit_article' component={EditArticle}/>
    </Router>, document.getElementById('app'));

