
    'use strict';
    angular.module('racoonBlog').config(config);

        function config($routeProvider, $locationProvider){
            $routeProvider
                .when('/',  {
                    template: "<start-blog articles='ctrl.articles' class='start-blog'></start-blog>"
                    /*controller: 'BlogController'*/
                })
                .when('/edit/:id', {
                    template: "<edit-article class='create-article' ng-switch='$ctrl.switchTepmplate'></edit-article>"
                    /*controller: 'EditArticleController as edit'*/
                })
                .when('/create', {
                    template: "<create-article  class='create-article' ng-switch='$ctrl.switchTepmplate'></create-article>"
                });

                $locationProvider.html5Mode({
                  enabled: false,
                  requireBase: false
                });
    }
