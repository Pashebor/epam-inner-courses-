(function(){
    'use strict';
    angular.module('racoonBlog').config(config);

        function config($routeProvider){
            $routeProvider
                .when('/',  {
                    templateUrl: '../app/pages/start_page.html',
                    controller: 'BlogController'
                })
                .when('/edit/:articleId', {
                    templateUrl: "../app/pages/edit.html",
                    controller: 'EditBlogController as edit'
                })
                .when('/create', {
                    templateUrl: "../app/pages/create_article.html"
                });
    }
})();