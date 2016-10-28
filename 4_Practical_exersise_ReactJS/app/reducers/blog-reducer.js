'use strict';
import {filteredArticles} from '../controllers/getArticles.function';
import {editedState, deletedState} from '../controllers/blog.reducer.functions';
import {GET_ARTICLES_SUCCESS, ADD_ARTICLE_SUCCESS, EDIT_ARTICLE_SUCCESS, DELETE_ARTICLE_SUCCESS} from '../actions/index';

const initialState = [];

const blogReducer =  ( state = initialState, action) => {
    switch (action.type) {
        case GET_ARTICLES_SUCCESS:
            let articlesState;
            return articlesState = action.payload;
        case ADD_ARTICLE_SUCCESS:
            return state.concat(action.payload);
        case EDIT_ARTICLE_SUCCESS:
            let newState;
            newState = editedState(state, action.payload);
            return newState;
        case DELETE_ARTICLE_SUCCESS:
            let deleteState = deletedState(state, action.payload);
            return deleteState;
        default: return state;
    }
    return state;
};

export default blogReducer;
