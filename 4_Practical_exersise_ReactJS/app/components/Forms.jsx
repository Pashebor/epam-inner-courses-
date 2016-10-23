
'use strict';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Link } from 'react-router';
import { connect } from 'react-redux';
import PostNotification from './PostNotification.jsx';
import {addArticle, editArticle, getSingleArticle} from './../actions/index.js';
import ModalDelete from './ModalDelete.jsx';
import {modal} from 'react-redux-modal';


class BlogEditor extends Component {
    constructor(props, context){
      super(props, context);
        this.state = {
            condition: undefined,
            id: undefined
        }
    }

    componentDidMount() {
        this.setState({id: this.props.params.splat});
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

    addModal(e) {
        e.preventDefault();
        modal.add(ModalDelete, {
            title: 'This is my modal',
            size: 'medium',
            closeOnOutsideClick: false,
            hideTitleBar: false,
            hideCloseButton: false
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

      if(!this.state.id) {
          $.ajax({url: '/articles_data', data: formData, type: 'POST', dataType: 'json', async: true}).done(data => {
            this.props.dispatch(addArticle(data.respDataCreate));
            this.setState({condition: true});
          }).fail (() => {
            this.setState({condition: false});
          });

      } else {
          $.ajax({url: '/articles_data/' + this.state.id, type: 'PUT', data: formData, dataType: 'json', async:true}).done(resp => {
              this.props.dispatch(editArticle(resp));
              this.setState({condition: true});
            }).fail (() => {
              this.setState({condition: false});
            });
      }

    }

    render() {

        let article = {};

        this.props.store.blogState.forEach(item => {
            if (item.id === this.state.id) {
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
                    <input type="text" id="author" ref="author" className="form-control" placeholder={article.author || 'Author name...'}  required />
                </div>
                <div className="form-group">
                    <label htmlFor="image"  className="form-block__label">Image</label>
                    <input type="text" id="image" ref="image" name="image" className="form-control" placeholder={article.image || 'URL of an image'} required />
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="form-block__label">Title</label>
                    <input type="text" id="title" ref="title" className="form-control" placeholder={article.header || 'Article header...'} required />
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
                {this.showDeleteButton ? <input type="reset"  className="btn btn-danger btn-delete" onClick={this.addModal.bind(this)}  value="delete" /> : null}
                <input type="submit" className="btn btn-info btn-submit" value="save" onClick={this.btnSubmitHandler.bind(this)} />

            </form>


         </div>
        );
    }
}



function mapStateToProps (store) {
    return {
        store: store
    }
}

export default connect(mapStateToProps)(BlogEditor);
