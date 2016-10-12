'use-strict';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import SendCorrect from './alerts/SendCorrect.jsx';
import SendIncorrect from './alerts/SendIncorrect.jsx';
import {addArticle, editArticle} from './../actions/index.js';

import $ from 'jquery';

class BlogEditor extends Component {
  constructor(props){
      super(props);
      this.condition = undefined;
  }
    render()  {
    
        var that = this;
        let formData = {};

        const ID = this.props.params.id;
        let article = {};

        this.props.store.blogState.forEach(function (item, index) {
            if (index == (ID - 1)) {
                article = Object.assign(item);
            }
        });

        let isSuccess = (condition) => {
            this.condition = condition;
            this.forceUpdate();
        };

        let submit = (event) => {
            event.preventDefault();

            formData.author = document.getElementById('author').value;
            formData.image = document.getElementById('image').value;
            formData.header = document.getElementById('title').value;
            formData.text = document.getElementById('text').value;
            formData.tags = document.getElementById('tags').value;

            if(!ID) {
                $.ajax({url: '/articles_data', data: formData, type: 'POST', dataType: 'json', async: true}).done(data => {
                  this.props.dispatch(addArticle(data.respDataCreate));
                  isSuccess(true);
                }).fail (() => {
                  isSuccess(false);
                });

            } else {
                $.ajax({url: '/articles_data/' + ID, type: 'PUT', data: formData, dataType: 'json', async:true}).done(resp => {
                    this.props.dispatch(editArticle(resp));
                    isSuccess(true);
                  }).fail (() => {
                    isSuccess(false);
                  });
            }
          };



    return(
            <form role="form" className="form-block"  name="formEdit" id='form'>
                <h2 className="edit-article__header">{article.header || 'CreateArticle'}</h2>

                {(this.condition === true ? <SendCorrect/> : '') || (this.condition === false ? <SendIncorrect /> : '') }

                <div className="form-group">
                    <label htmlFor="author" name="author" className="form-block__label">Author</label>
                    <input type="text" id="author" className="form-control" placeholder={article.author || 'Author name...'}  required />
                </div>
                <div className="form-group">
                    <label htmlFor="image"  className="form-block__label">Image</label>
                    <input type="text" id="image" name="image" className="form-control" placeholder={article.image || 'URL of an image'} required />
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="form-block__label">Title</label>
                    <input type="text" id="title" className="form-control" placeholder={article.header || 'Article header...'} required />
                </div>
                <div className="form-group">
                    <label htmlFor="text" className="form-block__label">Text</label>
                    <textarea className="form-control" rows="5" id="text"  required placeholder={article.text || 'Text...'} />
                </div>
                <div className="form-group">
                    <label htmlFor="tags" className="form-block__label">Tags</label>
                    <input type="text" id="tags" className="form-control" placeholder={article.tags || 'Tags...'} />
                </div>
                <Link to="/" className="btn btn-warning btn-cancel" role="link">cancel</Link>
                <input type="reset"  className="btn btn-danger btn-delete"  value="delete"/>
                <input type="submit" className="btn btn-info btn-submit" value="save" onClick={submit} />
            </form>
        );
    }
}

function mapStateToProps (store) {
    return {
        store: store
    }
}

export default connect(mapStateToProps)(BlogEditor);
