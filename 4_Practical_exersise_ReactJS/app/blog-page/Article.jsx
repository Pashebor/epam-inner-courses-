'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router';

class Article extends Component {
    render() {

        let linkTo = "/blog_editor/" + this.props.data.id;
      
        return (
            <article role="article" className="blog-article"  id={this.props.data.id}>
                <figure className="image-block" role="img">
                    <img className="image-block__picture" src={this.props.data.image} alt="Blogoflowers" title="Blogoflowers"/>
                </figure>
                <h2 className="blog-article__description"><Link to={linkTo}  className="blog-article__description-link" role="link">{this.props.data.header}</Link></h2>
                <footer className="blog-article__info" role="contentinfoo">
                    <time role="alert" className="blog-article__date"><span><svg  role="img" className="blog-article__date-icon"><use xlinkHref='images/sprite.svg#icon-clock'/></svg></span>{this.props.data.time}</time>
                    <address className="blog-article__author"><span><svg  role="img" className="blog-article__author-icon"><use xlinkHref='images/sprite.svg#icon-footstep'/></svg></span>{this.props.data.author}</address>
                    <div className="social">
                        <ul className="social__group">
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">Facebook share</span><svg  role="img" className="social__group-item-icon"><use xlinkHref='images/sprite.svg#icon-facebook'/></svg>16</a></li>
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">G+ share</span><svg  role="img" className="social__group-item-icon"><use xlinkHref='images/sprite.svg#icon-gplus'/></svg>7</a></li>
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">Twitter share</span><svg  role="img" className="social__group-item-icon"><use xlinkHref='images/sprite.svg#icon-twitter'/></svg>15</a></li>
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">VK share</span><svg  role="img" className="social__group-item-icon"><use xlinkHref='images/sprite.svg#icon-vk'/></svg>16</a></li>
                            <li className="social__group-item"><a href="#" role="link" className="social__group-item-link"><span className="screen-reader-text">Yaru share</span><svg  role="img" className="social__group-item-icon"><use xlinkHref='images/sprite.svg#icon-yaru'/></svg>1</a></li>
                        </ul>
                    </div>
                </footer>
                <p className="blog-article__note">{this.props.data.text}</p>
            </article>
        )
    }
}

export default Article;
