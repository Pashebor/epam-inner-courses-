'use strict';

import React from 'react';
import {removeDuplicatedTags} from './../controllers/filteredTags.function';
import { connect } from 'react-redux';
import {filterAction} from './../actions/index.js';

const SideBar = (props) => {

        let tagHandler = (e) => {
          e.preventDefault();
          props.dispatch(filterAction(e.target.innerHTML));
        };

        let listTags = removeDuplicatedTags(props.blogState).map(function (tag, i) {
            return(
              <li className="hot-hashtags__item"   key={i}  onClick={tagHandler}>{tag}</li>
            )
        });

        return(
            <aside role="complementary" className="sidebar">
                <article className="sidebar-hint" role="article">
                    <h3 className="sidebar-hint__header sidebar-hint__header--exclamation" role="heading">about</h3>
                    <p className="sidebar-hint__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </article>
                <article className="sidebar-hint" role="article">
                    <h3 className="sidebar-hint__header sidebar-hint__header--question" role="heading">some information</h3>
                    <p className="sidebar-hint__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </article>
                <ul className="hot-hashtags" role="presentation">
                    {listTags}
                </ul>
            </aside>
        );
    }


function mapStateToProps (store) {
    return {
        blogState: store.blogState
    }
}

export default connect(mapStateToProps) (SideBar);
