import { expect } from 'chai';

import {FILTER_SEARCH} from './../app/actions/index';

import filterReducer from './../app/reducers/filter-reducer';


describe('filter-reducer', () => {
    const state = '';
    let clickedTag = 'Racoon';

    it('should create an empty string', () => {
        expect(filterReducer(state, '')).to.be.defined;
    });

    it('should return a default empty state', () => {
        let action = { type: 'unknown'};
        let newState = filterReducer(state, action);
        expect(newState).to.deep.equal(state);
    });

    it('should return state with clicked tag value', () => {
        let newState = filterReducer(state, {type: FILTER_SEARCH, filterValue: clickedTag});
        expect (newState).to.deep.equal(clickedTag);
    });
});