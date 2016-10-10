import { createStore, combineReducers } from 'redux';

const blogReducer =  ( state = [], action) => {

  switch (action.type) {
    case 'ALL_ARTICLES':
      return state.concat(Object.assign({}, action.data));
    case 'ADD_ARTICLE':
      return state.concat([action.data]);
    case'DELETE_ARTICLE':
      return state.slice([action.id]);
    default:
    return state;

  }
  //
  // if (state === undefined) {
  //   state = [];
  // }
  //
  // if (action.type === 'ADD_ARTICLES') {
  //   state.concat([action.data]);
  // }
  //
  // return state;
}

// const redusers = combineReducers({
//   blogState: blogReducer
// });

const store = createStore(blogReducer);


export default store;
