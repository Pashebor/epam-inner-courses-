'use-strict';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';
import $ from 'jquery';

class BlogEditor extends Component {

    render()  {
      const ID = this.props.params.id;
      let article = {
        header: '',
        author: '',
        text: '',
        tags: '',
        image: ''
      };

     if(ID) {
       const getSingleArticle = (id) => {
         let dataObjectArticles = {};
         const article = (dataToShare = dataObjectArticles) => {
           dataToShare = $.ajax({url: '/articles_data/' + id, dataType: 'json', type: 'GET', async: false}).responseJSON;
           return dataToShare;
        }

        let data = article();
        return data;
      };
        article = Object.assign(getSingleArticle(ID));
    }

    return(
            <form role="form" className="form-block"  name="formEdit">
                <h2 className="edit-article__header">{article.header || 'CreateArticle'}</h2>
                <div className="form-group">
                    <label htmlFor="author" className="form-block__label">Author</label>
                    <input type="text" id="author" className="form-control" placeholder={article.author || 'Author name...'} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="image_upd" className="form-block__label">Image</label>
                    <input type="text" id="image_upd" className="form-control" placeholder={article.image || 'URL of an image'} />
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="form-block__label">Title</label>
                    <input type="text" id="title" className="form-control" placeholder={article.header || 'Article header...'} required />
                </div>
                <div className="form-group">
                    <label htmlFor="text" className="form-block__label">Text</label>
                    <textarea className="form-control" rows="5" id="text"  required placeholder={article.text || 'Text...'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="tags" className="form-block__label">Tags</label>
                    <input type="text" id="tags" className="form-control" placeholder={article.tags || 'Tags...'} />
                </div>
                <Link to="/" className="btn btn-warning btn-cancel" role="link">cancel</Link>
                <input type="reset"  className="btn btn-danger btn-delete"  value="delete"/>
                <input type="submit" className="btn btn-info btn-submit" value="save"  />
            </form>
        );
    }
}

export default BlogEditor;
