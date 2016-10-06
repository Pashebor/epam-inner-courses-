'use-strict';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';


class EditArticle extends Component {

    /*findArticleById: function (paramProps) {
        let gottenArticle = {};
        dataArticles.forEach(function (item) {
            if (item.id === paramProps) {
                gottenArticle = Object.assign(item);
            }
        });

        return gottenArticle;
    },*/

    render()  {

        /*let article = this.findArticleById(this.props.params.articleId);
        console.log(article.header);*/

        return(
            <form role="form" className="form-block"  name="formEdit">
                <h2 className="edit-article__header">null</h2>
                <div className="form-group">
                    <label htmlFor="author" className="form-block__label">Author</label>
                    <input type="text" id="author" className="form-control" placeholder="" required defaultValue='null'/>
                </div>
                <div className="form-group">
                    <label htmlFor="image_upd" className="form-block__label">Image</label>
                    <input type="text" id="image_upd" className="form-control" placeholder="URL of an image" />
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="form-block__label">Title</label>
                    <input type="text" id="title" className="form-control" defaultValue='null' required />
                </div>
                <div className="form-group">
                    <label htmlFor="text" className="form-block__label">Text</label>
                    <textarea className="form-control" rows="5" id="text"  required defaultValue='null'/>
                </div>
                <div className="form-group">
                    <label htmlFor="tags" className="form-block__label">Tags</label>
                    <input type="text" id="tags" className="form-control" defaultValue='null' />
                </div>
                <Link to="/" className="btn btn-warning btn-cancel" role="link">cancel</Link>
                <input type="reset"  className="btn btn-danger btn-delete"  value="delete"/>
                <input type="submit" className="btn btn-info btn-submit" value="save"  />
            </form>
        );
    }
}

export default EditArticle;
