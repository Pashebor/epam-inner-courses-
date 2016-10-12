'use strict';

export const getArticles = data => ({ type: 'GET_ARTICLES', data: data });
export const getTags = data => ({ type: 'GET_TAGS', tags: data });
export const addArticle = data => ({type: 'ADD_ARTICLE', data: data});
export const editArticle = data => ({type: 'EDIT_ARTICLE', data: data});
