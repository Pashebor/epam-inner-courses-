
    'use strict';
    angular.module('racoonBlog').config(config);

        function config($routeProvider){
            $routeProvider
                .when('/',  {
                    template: "<start-blog articles='ctrl.articles' class='start-blog'></start-blog>"
                    /*controller: 'BlogController'*/
                })
                .when('/edit/:articleId', {
                    template: "<edit-article articles='ctrl.articles' class='create-article'></edit-article>"
                    /*controller: 'EditArticleController as edit'*/
                })
                .when('/create', {
                    template: "<create-article articles='ctrl.articles' class='create-article'></create-article>"
                });
    }
