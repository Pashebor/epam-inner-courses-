
    'use strict';
   angular.module('racoonBlog', ['ngRoute', 'ngResource', 'ui.bootstrap', 'editArticleModule', 'startBlogModule', 'tagModule', 'createArticleModule']).controller('AppCtrl', appController);

    function appController (blogArticleService) {
        var vm = this;

        vm.articles = {
               list:  (() => {
                  return blogArticleService.getArticles;
               })(),
               tags: (() => {
                   return blogArticleService.getTags.query();
               })()
           }
    }
