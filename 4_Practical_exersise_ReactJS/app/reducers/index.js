import { combineReducers } from 'redux';

//Reducers

import blogReducer from './blog-reducer';
import filterReducer from './filter-reducer';
import {reducer as modalReducer} from 'react-redux-modal';


//Combine Reducers

var reducer = combineReducers({
    blogState: blogReducer,
    filterState: filterReducer,
    modals: modalReducer
});

export default reducer;
