'use strict';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';


class Tag extends Component{
    render() {
        return(
            <li className="hot-hashtags__item"  ><span className="hot__hashtags-item__link"><span className="screen-reader-text">link</span>{this.props.data}</span></li>

        );
    }
}

export default Tag;
