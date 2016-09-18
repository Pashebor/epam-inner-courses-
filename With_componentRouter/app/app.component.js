
    'use strict';
   angular.module('app', ['ngComponentRouter', 'ngResource', 'ui.bootstrap', 'blog', 'create', 'edit']).value('$routerRootComponent', 'app').component('app', {
     templateUrl: 'templates/app.template.html',
     controller: appController,
     $routeConfig: [
       {path: '/', component: 'startBlog', useAsDefault: true},
       {path: '/create', component: 'createArticle'},
       {path: '/edit/:id', component: 'editArticle'}
  ]
   });

    function appController (blogArticleService) {
        var vm = this;

        vm.articles = {
               list:  (() => {
                  return blogArticleService.getArticles;
               })()
           }

    }
