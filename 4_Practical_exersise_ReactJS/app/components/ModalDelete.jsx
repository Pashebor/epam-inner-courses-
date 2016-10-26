import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from 'react-router';
import {deleteArticle} from './../actions/index.js';
import {modal} from 'react-redux-modal';

 class ModalDelete extends Component{

     removeThisModal() {
         this.props.removeModal();

     }

     btnYesHandler(e) {
         e.preventDefault();
         this.props.dispatch(deleteArticle(this.props.articleId));
         this.props.removeModal();
         this.context.router.push('/');
     }

  render() {
      return (
          <div>
              <h4>Do you want to delete the "{this.props.articleHeader}" article?</h4>
             <div className="modal-body">
               <button type="button" className="btn btn-info btn-submit--modal" onClick={this.btnYesHandler.bind(this)}>Yes</button>
               <button type="button" className="btn btn-warning btn-cancel--modal" onClick={this.removeThisModal.bind(this)}>No</button>
             </div>
          </div>
      )
  }
}

ModalDelete.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ModalDelete;
