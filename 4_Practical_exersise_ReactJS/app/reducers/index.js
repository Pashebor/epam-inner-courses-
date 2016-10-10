import { combineReducers } from 'redux';

//Reducers

import blogReducer from './blog-reducer';
import tagReducer from './tag-reducer';
import formsReducer from './forms-reducer';

//Combine Reducers

var reducers = combineReducers({
    blogState: blogReducer,
    tagState: tagReducer,
    formsState: formsReducer
});

export default reducers;