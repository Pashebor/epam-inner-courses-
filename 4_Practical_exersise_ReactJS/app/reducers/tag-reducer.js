import $ from 'jquery';

const initialState = [];



const tagReducer =  ( state = initialState, action) => {
    switch (action.type) {
      case 'TAG_SEARCH':
      return state.concat(action.tag);
      default: state;
    }
    return state;
};

export default tagReducer;
