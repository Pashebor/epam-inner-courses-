import { combineReducers } from 'redux';

//Reducers

import blogReducer from './blog-reducer';
import filterReducer from './filter-reducer';
import blogFormsReducer from './forms-reducer';
import { reducer as modalReducer } from 'react-redux-modal';


//Combine Reducers

var reducers = combineReducers({
    blogState: blogReducer,
    filterState: filterReducer,
    formsState: blogFormsReducer,
    modals: modalReducer
  });

export default reducers;
