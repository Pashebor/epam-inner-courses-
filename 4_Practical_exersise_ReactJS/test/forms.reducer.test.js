import { expect } from 'chai';

import {GET_SINGLE_ARTICLE_SUCCESS, TRIGGER_VISIBILITY_DEL_BTN, SET_NOTIFICATION_CONDITION} from './../app/actions/index';

import formsReducer from './../app/reducers/forms-reducer';

let article = {
    "id": "3",
    "author": "E. Hyperraccoon",
    "image": "images/flowers.png",
    "header": "Blogotitle of blogopost about blogoflowers",
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "time": "22:58 Jan 01, 2014",
    "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]
};

describe ('forms-reducer', () => {
    const state = {
        article: {},
        condition: null,
        showDeleteButton: false
    };

    it('should create an empty object', () => {
        expect(formsReducer(state, {})).to.be.defined;
    });

    it('should return default state', () => {
        let action = { type: 'unknown'};
        let newState = formsReducer(state, action);
        expect(newState).to.deep.equal(state);
    });

    it('should return state with data and changed properties', () => {
        let newState = formsReducer(state, {type: GET_SINGLE_ARTICLE_SUCCESS, payload: article, show: true, condition: null});
        expect(newState).to.deep.equal(Object.assign({}, state, {article: article, showDeleteButton: true, condition: null}))
    });

    it("should change  value of state's 'showDeleteButton' field", () => {
        let newState = formsReducer(state, {type: TRIGGER_VISIBILITY_DEL_BTN, show: true});
        expect(newState).to.deep.equal(Object.assign({}, state, {showDeleteButton: true}));
    });

    it("should change value of state's 'condition' field which displays notifications on submitting forms", () => {
        let newState = formsReducer(state, {type: SET_NOTIFICATION_CONDITION, condition: true});
        expect(newState).to.deep.equal( Object.assign({}, state, {condition: true}));
    });

});