'use strict';
import {filteredArticles} from '../controllers/getArticles.function';
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
            newState = state.map(item => {
                if(item.id == action.payload.id) {
                    return action.payload;
                } else {
                    return item;
                }
            });
            return newState;
        case DELETE_ARTICLE_SUCCESS:
            let deleteState = state.filter(item => {
                return item.id != action.payload;
            });
            return deleteState;
        default: return state;
    }
    return state;
};

export default blogReducer;
