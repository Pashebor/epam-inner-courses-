import {GET_SINGLE_ARTICLE_SUCCESS, TRIGGER_VISIBILITY_DEL_BTN, SET_NOTIFICATION_CONDITION} from '../actions/index';

const initialState = {
    article: {},
    condition: null,
    showDeleteButton: false
};


const formsReducer =  ( state = initialState, action) => {
    switch (action.type) {
        case GET_SINGLE_ARTICLE_SUCCESS:
            return Object.assign({}, state, {article: action.payload, showDeleteButton: action.show, condition: action.condition});
        case TRIGGER_VISIBILITY_DEL_BTN:
            return Object.assign({}, state, {showDeleteButton: action.show});
        case SET_NOTIFICATION_CONDITION:
            return Object.assign({}, state, {condition: action.condition});
        default: return state;
    }
};

export default formsReducer;
