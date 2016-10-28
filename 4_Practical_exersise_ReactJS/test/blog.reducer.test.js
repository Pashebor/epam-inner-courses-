import { expect } from 'chai';

import {editedState, deletedState} from './../app/controllers/blog.reducer.functions';
import blogReducer from './../app/reducers/blog-reducer';

import {GET_ARTICLES_SUCCESS, ADD_ARTICLE_SUCCESS, EDIT_ARTICLE_SUCCESS, DELETE_ARTICLE_SUCCESS} from './../app/actions/index';

let data = [
    {
    "id": "1",
    "author": "E. Hyperraccoon",
    "image": "images/flowers.png",
    "header": "Blogotitle of blogopost about blogoflowers",
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "time": "22:58 Jan 01, 2014",
    "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]
    },
    {
        "id": "2",
        "author": "E. Hyperraccoon",
        "image": "images/paint.png",
        "header": "Blogotitle of paints",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "time": "28:67 Jan 01, 2014",
        "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Duck", "Developer", "Car", "Jeep"]
    }
];

let article = {
    "id": "3",
    "author": "E. Hyperraccoon",
    "image": "images/flowers.png",
    "header": "Blogotitle of blogopost about blogoflowers",
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "time": "22:58 Jan 01, 2014",
    "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]
};

let editedArticle = {
    "id": "1",
    "author": "I'am",
    "image": "images/some_pic.png",
    "header": "Title",
    "text": "Text",
    "time": "22:58 Jan 01, 2014",
    "tags": ["tag1", "tag2"]
};

let idToDelete = 1;

describe ('blog-reducer', () => {
    const state = [];

    it('should create an empty object', () => {
        expect(blogReducer(state, {})).to.be.defined;
    });

    it('should return a default empty state', () => {
        let action = { type: 'unknown'};
        let newState = blogReducer(state, action);
        expect(newState).to.deep.equal(state);
    });

    it('should return new state with all posts', () => {
        let newState = blogReducer(state, {type: GET_ARTICLES_SUCCESS, payload: data});
        expect(newState).to.deep.equal(data);
    });

    it('should return new state with added article', () => {
        let state = data;
        let newState = blogReducer(state, {type: ADD_ARTICLE_SUCCESS, payload: article});
        expect(newState).to.deep.equal(data.concat(article));
    });

    it ('should return edited state', () => {
        let state = data;
        let newState = blogReducer(state, {type: EDIT_ARTICLE_SUCCESS, payload: editedArticle});
        expect(newState).to.deep.equal(editedState(state, editedArticle));
    });

    it ('should return state with deleted item', () => {
        let state = data;
        let newState = blogReducer(state, {type: DELETE_ARTICLE_SUCCESS, payload: idToDelete});
        expect (newState).to.deep.equal(deletedState(state, idToDelete));
    });
});
