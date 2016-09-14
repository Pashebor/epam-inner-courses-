
    'use strict';
   angular.module('racoonBlog', ['ngRoute', 'ngResource', 'ui.bootstrap', 'tagModule', 'editArticleModule', 'createArticleModule', 'startBlogModule']).controller('AppController', appController);

    function appController (blogArticleService) {

        this.articles = {
               list:  (() => {
                  return blogArticleService.getArticles.query();
               })(),
               tags: (() => {
                   return blogArticleService.getTags.query();
               })()
           }
    }
