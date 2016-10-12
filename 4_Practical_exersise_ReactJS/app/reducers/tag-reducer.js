import $ from 'jquery';

const initialState = [];



const tagReducer =  ( state = initialState, action) => {
    switch (action.type) {
        case 'GET_TAGS':
        return state.concat(action.tags);
    }
    return state;
};

export default tagReducer;
