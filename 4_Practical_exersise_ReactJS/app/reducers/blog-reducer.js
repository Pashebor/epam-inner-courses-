import $ from 'jquery';



let data = $.ajax({url: '/articles', dataType: 'json', type: 'GET', async: false}).responseJSON;

const initialState = [].concat(data);



const blogReducer =  ( state = initialState, action) => {

    switch (action.type) {
        case 'ALL_ARTICLES':
            return state.concat(action.data);
        case 'ADD_ARTICLE':
            return state.concat([action.data]);
        case'DELETE_ARTICLE':
            return state.slice([action.id]);
    }
    return state;
};

export default blogReducer;
