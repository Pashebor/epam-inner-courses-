'use strict';

export const getArticles = data => ({ type: 'GET_ARTICLES', data: data });
export const addArticle = data => ({type: 'ADD_ARTICLE', data: data});
export const editArticle = data => ({type: 'EDIT_ARTICLE', data: data});
export const deleteArticle = id => ({type: 'DELETE_ARTICLE', id: id});
export const getSingleArticle = data => ({type: 'GET_SINGLE_ARTICLE', data: data});
export const addTags = data => ({type: 'ADD_TAGS', tags: data});
