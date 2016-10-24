
'use strict';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Link } from 'react-router';
import { connect } from 'react-redux';
import PostNotification from './PostNotification.jsx';
import {addArticle, editArticle, getSingleArticle, setDelBtnVisibility, setNotifCondition} from './../actions/index.js';
import ModalDelete from './ModalDelete.jsx';
import {modal} from 'react-redux-modal';


class BlogEditor extends Component {

    componentDidMount() {
        if (this.props.routeParams.splat) {
            this.props.dispatch(getSingleArticle(this.props.routeParams.splat));
        } else {
            this.props.dispatch(setDelBtnVisibility(false));
            this.props.dispatch(setNotifCondition(null));
        }
    }

    openModal(e) {
        e.preventDefault();
        modal.add(ModalDelete, {
            title: 'This is my modal',
            size: 'small',
            closeOnOutsideClick: true,
            hideTitleBar: false,
            hideCloseButton: true
        });
    }

    btnSubmitHandler(e) {
      e.preventDefault();

      let formData = {};

      formData.author = this.refs.author.value;
      formData.image = this.refs.image.value;
      formData.header = this.refs.title.value;
      formData.text = this.refs.text.value;
      formData.tags = this.refs.tags.value;

      if(!this.props.routeParams.splat) {
          this.props.dispatch(addArticle(formData));
      } else {
          this.props.dispatch(editArticle(formData, this.props.routeParams.splat));
      }

    }

    render() {

        //var artId = this.props.routeParams.splat;
        if(this.props.routeParams.splat) {
            var article = this.props.article;
        } else {
            article = {};
        }

        /* var postId = this.props.routeParams.splat;

         var post = this.props.post;

         const addPostFunction = (event) => {
         event.preventDefault();
         const data = Array.prototype.slice.call(this.refs.editForm.elements);
         const redactedPost = data.reduce( (acc, nodeItem) => {
         if ( nodeItem.tagName.toLowerCase() !== 'button') {
         acc[nodeItem.getAttribute('name')] = nodeItem.value;
         }
         return acc;
         } , {});

         if (postId) {
         let newpost = Object.assign({},post,redactedPost);
         this.props.dispatch(savePost(newpost));
         modal.add(successModalComopnent, {
         size: 'medium',
         closeOnOutsideClick: true,
         action: 'saved'
         });
         return false;
         }
         this.props.dispatch(addPost(redactedPost));
         modal.add(successModalComopnent, {
         size: 'medium',
         closeOnOutsideClick: true,
         action: 'saved'
         });
         };

         var deletePost = () => {
         modal.add(deleteModalComopnent, {
         title: 'Do you want to delete this post?',
         size: 'medium',
         closeOnOutsideClick: true,
         dispatch: this.props.dispatch,
         postId: postId
         });


         {this.showDeleteButton ? <input type="reset"  className="btn btn-danger btn-delete" onClick={this.addModal.bind(this)}  value="delete" /> : null}
         }*/
console.log(this.props.condition);
        return(
        <div>
            <form role="form" className="form-block"  name="formEdit" id='form'>
                <h2 className="edit-article__header">{article.header || 'CreateArticle'}</h2>
                {<PostNotification posted={this.props.condition}/>}
                <div className="form-group">
                    <label htmlFor="author" name="author" className="form-block__label">Author</label>
                    <input type="text" id="author" ref="author" className="form-control" placeholder={article.author || 'Author name...'}  required={true} />
                </div>
                <div className="form-group">
                    <label htmlFor="image"  className="form-block__label">Image</label>
                    <input type="text" id="image" ref="image" name="image" className="form-control" placeholder={article.image || 'URL of an image'} required={true} />
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="form-block__label">Title</label>
                    <input type="text" id="title" ref="title" className="form-control" placeholder={article.header || 'Article header...'} required={true}/>
                </div>
                <div className="form-group">
                    <label htmlFor="text" className="form-block__label">Text</label>
                    <textarea className="form-control" rows="5" id="text" ref="text"  required placeholder={article.text || 'Text...'} />
                </div>
                <div className="form-group">
                    <label htmlFor="tags" className="form-block__label">Tags</label>
                    <input type="text" ref="tags" id="tags" className="form-control" placeholder={article.tags || 'Tags...'} />
                </div>
                <Link to="/" className="btn btn-warning btn-cancel" role="link">cancel</Link>
                {this.props.showDeleteButton ? <input type="reset"  className="btn btn-danger btn-delete" onClick={this.openModal.bind(this)}  value="delete" /> : null}
                <input type="submit" className="btn btn-info btn-submit" value="save" onClick={this.btnSubmitHandler.bind(this)} />

            </form>


         </div>
        );
    }
}



function mapStateToProps (store) {
    return {
        article: store.formsState.article,
        condition: store.formsState.condition,
        showDeleteButton: store.formsState.showDeleteButton
    }
}

export default connect(mapStateToProps)(BlogEditor);
