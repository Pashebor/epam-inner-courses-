import { expect } from 'chai';

import * as actions from './../app/actions/index';
import * as types from './../app/actions/index';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let id = 1;
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

describe('async actions', () => {

    afterEach(() => {
        nock.cleanAll()
    });

    it('creates GET_ARTICLES_SUCCESS when getting articles has been done', () => {
        nock('http://localhost:3000/')
            .get('/articles_data')
            .reply(200, data);

        const expectedAction = [{ type: types.GET_ARTICLES_SUCCESS, payload: data }];

        const store = mockStore({ state: [] });

        return store.dispatch(actions.getArticles())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedAction)
      })
    });

    it('creates GET_SINGLE_ARTICLE_SUCCESS when getting a single article has been done', () => {
        nock('http://localhost:3000/')
            .get('/articles_data/' + id)
            .reply(200, data);

        const expectedAction = [{ type: types.GET_SINGLE_ARTICLE_SUCCESS, payload: data, show: true, condition: null }];

        const store = mockStore({ state: [] });
        return store.dispatch(actions.getSingleArticle(id))
        .then(() => {
           expect(store.getActions()).to.deep.equal(expectedAction)
        })
    });

    it('creates ADD_ARTICLE_SUCCESS when posting an article has been done', () => {
        nock('http://localhost:3000/')
            .post('/articles_data')
            .reply(200, data[0]);

        const expectedActions = [
          {type: types.ADD_ARTICLE_SUCCESS, payload: data[0]},
          {type: types.SET_NOTIFICATION_CONDITION, condition: true}
        ];

        const store = mockStore({ state: [] });
        return store.dispatch(actions.addArticle(data[0]))
        .then(() => {
           expect(store.getActions()).to.deep.equal(expectedActions)
        })
    });

    it('creates EDIT_ARTICLE_SUCCESS when puting an edited article has been done', () => {
        nock('http://localhost:3000/')
            .put('/articles_data/' + id)
            .reply(200, data[0]);

        const expectedActions = [
          {type: types.EDIT_ARTICLE_SUCCESS, payload: data[0]},
          {type: types.SET_NOTIFICATION_CONDITION, condition: true}
        ];

        const store = mockStore({ state: [] });
        return store.dispatch(actions.editArticle(data[0], id))
        .then(() => {
           expect(store.getActions()).to.deep.equal(expectedActions)
        })
    });

    it('creates DELETE_ARTICLE_SUCCESS when deleting an article has been done', () => {
        nock('http://localhost:3000/')
            .delete('/articles_data/' + id)
            .reply(200, id);

        const expectedAction = [{type: types.DELETE_ARTICLE_SUCCESS, payload: id}];

        const store = mockStore({state: []});
        return store.dispatch(actions.deleteArticle(id))
        .then(() => {
           expect(store.getActions()).to.deep.equal(expectedAction)
        })
    });

});
