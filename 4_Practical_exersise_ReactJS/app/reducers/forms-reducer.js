import $ from 'jquery';

const initialState = {
    id: [],
    article: []
};





const formsReducer =  ( state = initialState, action) => {

    switch (action.type) {

        case 'CREATE_ARTICLE':
            return state.concat([action.data]);
        case 'DELETE_ARTICLE':
            return state.concat([action.data]);
        case'UPDATE_ARTICLE':
            return state.slice([action.id]);
    }
    return state;
};

export default formsReducer;
