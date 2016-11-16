
'use strict';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostNotification from './PostNotification.jsx';
import {addArticle, editArticle, getSingleArticle, setDelBtnVisibility, setNotifCondition, deleteArticle} from './../actions/index.js';
import ModalDelete from './ModalDelete.jsx';
import {modal} from 'react-redux-modal';
import ReduxModal from 'react-redux-modal';


class BlogEditor extends Component {

    componentDidMount() {

        if (this.props.params.id) {
            this.props.getSingleArticle(this.props.params.id);
        } else {
            this.props.setDelBtnVisibility(false);
            this.props.setNotifCondition(null);
        }
    }

    btnSubmitHandler(e) {
        e.preventDefault();
        let formData = {};

        for (var keys in this.refs) {
            formData[keys] = this.refs[keys].value;
        }
        
        if(!this.props.params.id) {
          this.props.addArticle(formData);
        } else {
          this.props.editArticle(formData, this.props.params.id);
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
            deleteArticle: this.props.deleteArticle,
            articleHeader: this.props.state.article.header,
            articleId: this.props.state.article.id
        });
    }



    render() {
        return(
          <div>
           {<ReduxModal />}
            <form role="form" className="form-block"  onSubmit={this.btnSubmitHandler.bind(this)} >
                <h2 className="edit-article__header">{this.props.params.id ? this.props.state.article.header : 'CreateArticle'}</h2>
                {<PostNotification posted={this.props.state.condition}/>}
                <div className="form-group">
                    <label htmlFor="author" name="author" className="form-block__label">Author</label>
                    <input type="text" name="author" ref="author" className="form-control" placeholder={this.props.params.id ? this.props.state.article.author : 'Author name...'}  required />
                </div>
                <div className="form-group">
                    <label htmlFor="image"  className="form-block__label">Image</label>
                    <input type="text"  ref="image" name="image" className="form-control" placeholder={this.props.params.id ? this.props.state.article.image : 'URL of an image'} required />
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="form-block__label">Title</label>
                    <input type="text"  name="header" ref="header" className="form-control" placeholder={this.props.params.id ? this.props.state.article.header : 'Article header...'} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="text" className="form-block__label">Text</label>
                    <textarea className="form-control" rows="5" ref="text"  name="text" placeholder={this.props.params.id ? this.props.state.article.text : 'Text...'}  required/>
                </div>
                <div className="form-group">
                    <label htmlFor="tags" className="form-block__label">Tags</label>
                    <input type="text"  className="form-control" name="tags" ref="tags" placeholder={this.props.params.id ? this.props.state.article.tags : 'Tags...'} required/>
                </div>
                <Link to="/" className="btn btn-warning btn-cancel" role="link">cancel</Link>
                {this.props.state.showDeleteButton ? <button type="reset"  className="btn btn-danger btn-delete" onClick={this.openModal.bind(this)} >delete</button> : null}
                <button type="submit" className="btn btn-info btn-submit"  >save</button>
            </form>
          </div>
        );
    }
}


const mapStateToProps = store => {
    return {
        state: store.formsState
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({addArticle, editArticle, getSingleArticle, setDelBtnVisibility, setNotifCondition, deleteArticle}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogEditor);
