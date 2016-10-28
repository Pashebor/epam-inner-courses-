
'use strict';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Link } from 'react-router';
import { connect } from 'react-redux';
import PostNotification from './PostNotification.jsx';
import {addArticle, editArticle, getSingleArticle, setDelBtnVisibility, setNotifCondition} from './../actions/index.js';
import ModalDelete from './ModalDelete.jsx';
import {modal} from 'react-redux-modal';
import ReduxModal from 'react-redux-modal';


class BlogEditor extends Component {

    componentDidMount() {
        if (this.props.routeParams.splat) {
            this.props.dispatch(getSingleArticle(this.props.routeParams.splat));
        } else {
            this.props.dispatch(setDelBtnVisibility(false));
            this.props.dispatch(setNotifCondition(null));
        }
    }

    btnSubmitHandler(e) {
        e.preventDefault();
        let formData = {};
        let submitedData = [].slice.call(this.refs.form_data.elements);

        for(var i = 0; i < submitedData.length; i+=1) {
            if (submitedData[i].tagName.toLowerCase() !== 'button') {
              formData[submitedData[i].getAttribute('name')] = submitedData[i].value;
            }
        }

        if(!this.props.routeParams.splat) {
          this.props.dispatch(addArticle(formData));
        } else {
          this.props.dispatch(editArticle(formData, this.props.routeParams.splat));
        }

    }


    openModal(e) {
        e.preventDefault();
        modal.add(ModalDelete, {
            title: 'Deleting an article!',
            size: 'small',
            closeOnOutsideClick: true,
            hideTitleBar: false,
            hideCloseButton: true,
            dispatch: this.props.dispatch,
            articleHeader: this.props.article.header,
            articleId: this.props.article.id
        });
    }



    render() {
        return(
          <div>
           {<ReduxModal />}
            <form role="form" className="form-block"  onSubmit={this.btnSubmitHandler.bind(this)}    ref="form_data" >
                <h2 className="edit-article__header">{this.props.routeParams.splat ? this.props.article.header : 'CreateArticle'}</h2>
                {<PostNotification posted={this.props.condition}/>}
                <div className="form-group">
                    <label htmlFor="author" name="author" className="form-block__label">Author</label>
                    <input type="text" name="author"   className="form-control" placeholder={this.props.routeParams.splat ? this.props.article.author : 'Author name...'}  required />
                </div>
                <div className="form-group">
                    <label htmlFor="image"  className="form-block__label">Image</label>
                    <input type="text"    name="image" className="form-control" placeholder={this.props.routeParams.splat ? this.props.article.image : 'URL of an image'} required />
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="form-block__label">Title</label>
                    <input type="text"  name="header" className="form-control" placeholder={this.props.routeParams.splat ? this.props.article.header : 'Article header...'} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="text" className="form-block__label">Text</label>
                    <textarea className="form-control" rows="5"   name="text" placeholder={this.props.routeParams.splat ? this.props.article.text : 'Text...'}  required/>
                </div>
                <div className="form-group">
                    <label htmlFor="tags" className="form-block__label">Tags</label>
                    <input type="text"  className="form-control" name="tags" placeholder={this.props.routeParams.splat ? this.props.article.tags : 'Tags...'} required/>
                </div>
                <Link to="/" className="btn btn-warning btn-cancel" role="link">cancel</Link>
                {this.props.showDeleteButton ? <button type="reset"  className="btn btn-danger btn-delete" onClick={this.openModal.bind(this)} >delete</button> : null}
                <button type="submit" className="btn btn-info btn-submit"  >save</button>
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
