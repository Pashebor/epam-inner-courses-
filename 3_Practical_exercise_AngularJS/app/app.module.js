
    'use strict';
   angular.module('racoonBlog', ['ngRoute', 'ngResource', 'ui.bootstrap', 'editArticleModule', 'createArticleModule', 'startBlogModule']).controller('AppController', ShareData);

    function ShareData(blogArticleService) {
           this.articles = {
               list:  (() => {
                  return blogArticleService.getArticles.query();
               })(),
               tags: (() => {
                   return blogArticleService.getTags.query();
               })()
           }

    }
