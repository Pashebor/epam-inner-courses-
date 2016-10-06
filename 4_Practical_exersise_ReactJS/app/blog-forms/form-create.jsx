'use strict';

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';


class CreateArticle extends Component {

    render() {

        return(
            <form name="formCreate" className="form-block" >
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
                <input type="button" className="btn btn-info btn-submit" value="save" />
            </form>
        );
    }
}

export default CreateArticle;