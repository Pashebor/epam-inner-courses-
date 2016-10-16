
'use strict';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Link } from 'react-router';
import { connect } from 'react-redux';
import PostNotification from './PostNotification.jsx';
import {addArticle, editArticle, getSingleArticle, deleteArticle} from './../actions/index.js';


import 'bootstrap';


class BlogEditor extends Component {
    constructor(props, context){
      super(props, context);
        this.state = {
            modalButtonsHide: false,
            condition: undefined,
            ID: undefined,
            article: {}
        }

    }

    componentDidMount() {
        const { router } = this.context;
        this.setState({ID: this.props.params.splat});
        this.showDeleteButton = false;

        if (this.props.store.blogState.length === 0 && this.props.routeParams.splat !== this.undefined && this.props.routeParams.splat !== '') {
            $.ajax({
                url: '/articles_data/' + this.props.routeParams.splat,
                dataType: 'json',
                type: 'GET',
                async: true
            }).done(response => {
                this.props.dispatch(getSingleArticle(response));
            });
        }
    }

    btnSubmitHandler(e) {
      e.preventDefault();

      let formData = {};

      formData.author = document.getElementById('author').value;
      formData.image = document.getElementById('image').value;
      formData.header = document.getElementById('title').value;
      formData.text = document.getElementById('text').value;
      formData.tags = document.getElementById('tags').value;

      if(!this.state.ID) {
          $.ajax({url: '/articles_data', data: formData, type: 'POST', dataType: 'json', async: true}).done(data => {
            this.props.dispatch(addArticle(data.respDataCreate));
            this.setState({condition: true});
          }).fail (() => {
            this.setState({condition: false});
          });

      } else {
          $.ajax({url: '/articles_data/' + this.state.ID, type: 'PUT', data: formData, dataType: 'json', async:true}).done(resp => {
              this.props.dispatch(editArticle(resp));
              this.setState({condition: true});
            }).fail (() => {
              this.setState({condition: false});
            });
      }

    }

    btnYesHandler(e) {
        e.preventDefault();
        this.setState({modalButtonsHide: this.state.modalButtonsHide = true});
    }

    btnOkHandler(e) {
      e.preventDefault();
      $.ajax({url: '/articles_data/' + this.state.ID,  type: 'DELETE', dataType: 'json', async: true}).done(data => {
        this.props.dispatch(deleteArticle(data));
        this.context.router.push('/');
      }).fail (() => {
        console.log('Error');
      });

    }

    render() {

        let article = {};

        this.props.store.blogState.forEach(item => {
            if (item.id === this.state.ID) {
                this.showDeleteButton = true;
                article = item;
            }
        });

    return(
        <div>
            <form role="form" className="form-block"  name="formEdit" id='form'>
                <h2 className="edit-article__header">{article.header || 'CreateArticle'}</h2>

                {<PostNotification posted={this.state.condition}/>}

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
                {this.showDeleteButton ? <input type="reset"  className="btn btn-danger btn-delete"  value="delete" data-toggle="modal" data-target="#myModal"/> : null}
                <input type="submit" className="btn btn-info btn-submit" value="save" onClick={this.btnSubmitHandler.bind(this)} />

            </form>
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Deleting an article!</h2>
                        </div>
                        <div className="modal-body">
                            {!this.state.modalButtonsHide ? <h4>Do you want to delete the "{article.header}" article?</h4> : null}
                            {this.state.modalButtonsHide ? <h4>The Article has deleted.</h4> : null}
                        </div>
                        <div className="modal-footer">
                            {this.state.modalButtonsHide ? <button type="button" className="btn btn-info btn-submit--modal" data-dismiss="modal" onClick={this.btnOkHandler.bind(this)}>Ok</button> : null}
                            {!this.state.modalButtonsHide ? <button type="button" className="btn btn-info btn-submit--modal"  onClick={this.btnYesHandler.bind(this)}>Yes</button> : null}
                            {!this.state.modalButtonsHide ? <button type="button" className="btn btn-warning btn-cancel--modal" data-dismiss="modal">No</button> : null}
                        </div>
                    </div>
                </div>
            </div>
         </div>
        );
    }
}

BlogEditor.contextTypes = {
    router: React.PropTypes.object.isRequired,
    store:  React.PropTypes.object
}

function mapStateToProps (store) {
    return {
        store: store
    }
}

export default connect(mapStateToProps)(BlogEditor);
