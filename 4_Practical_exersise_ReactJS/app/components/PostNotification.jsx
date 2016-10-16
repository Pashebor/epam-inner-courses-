'use strict';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

class PostNotification extends Component{
    render() {
        return(
        <div>
            {this.props.posted === true ? <h3 className="edit-article__alert-window" >Article Created</h3> : null}
            {this.props.posted === false ? <h3 className="edit-article__alert-window edit-article__alert-window--error" >Error !</h3> : null}
        </div>
        );
    }
}

export default PostNotification;