import { combineReducers } from 'redux';

//Reducers

import blogReducer from './blog-reducer';
import tagReducer from './tag-reducer';


//Combine Reducers

var reducers = combineReducers({
    blogState: blogReducer,
    tagState: tagReducer
});

export default reducers;
