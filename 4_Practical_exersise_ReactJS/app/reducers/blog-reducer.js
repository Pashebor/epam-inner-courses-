import {filteredArticles} from '../controllers/getArticles.function';
import $ from 'jquery';
const initialState = [];



const blogReducer =  ( state = initialState, action) => {
    switch (action.type) {
        case 'GET_ARTICLES':
            let articlesState;
            return articlesState = filteredArticles(state, action.data);
        case 'GET_SINGLE_ARTICLE':
            return state.concat(action.data);
        case 'ADD_ARTICLE':
            return state.concat(action.data);
        case 'EDIT_ARTICLE':
            let newState;
            newState = state.map(item => {
                if(item.id == action.data.id) {
                    return action.data;
                } else {
                    return item;
                }
            });
            return newState;
        case'DELETE_ARTICLE':
            return state.slice(action.id);
        default: state;
    }
    return state;
};

export default blogReducer;
