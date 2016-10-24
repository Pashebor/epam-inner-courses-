import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from 'react-router';
import {deleteArticle} from './../actions/index.js';
import { connect } from 'react-redux';
import {modal} from 'react-redux-modal';

 class ModalDelete extends Component{
     constructor(props, context) {
         super(props, context);
         console.log('## MODAL DATA AND PROPS:', this.props);

     }
     removeThisModal() {
         this.props.removeModal();
     }
     /*btnYesHandler(e) {
         e.preventDefault();
         this.setState({modalButtonsHide: this.state.modalButtonsHide = true});
     }

     btnOkHandler(e) {
         e.preventDefault();
         $.ajax({url: '/articles_data/' + this.props.id,  type: 'DELETE', dataType: 'json', async: true}).done(data => {
             this.props.dispatch(deleteArticle(data));
             this.context.router.push('/');
         }).fail (() => {
             console.log('Error');
         });

     }*/
  render() {
      return (
          <div>
              <p>this is my modal</p>
              <button type="button" onClick={this.removeThisModal.bind(this)}> cancel</button>
          </div>
      )
  }
}

/*ModalDelete.contextTypes = {
    router: React.PropTypes.object.isRequired,
    store:  React.PropTypes.object
};

    function mapStateToProps (store) {
    return {
        store: store
    }
}*/

export default ModalDelete;
