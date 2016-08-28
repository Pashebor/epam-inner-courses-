
    'use strict';
    angular.module('racoonBlog', ['ngRoute', 'ngResource', 'ui.bootstrap', 'blogComponents']).controller('AppController', ShareData);

    function ShareData(blogArticleService) {
           this.articles = {
               list: (function () {
                  return blogArticleService.getArticles.query();
               })(),
               tags: (function () {
                   return blogArticleService.getTags.query();
               })()
           }
    }
