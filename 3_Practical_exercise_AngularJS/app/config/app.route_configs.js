(function(){
    'use strict';
    angular.module('racoonBlog').config(config);

        function config($routeProvider){
            $routeProvider
                .when('/',  {
                templateUrl: '../app/pages/start_page.html'
                })
                .when('/edit', {
                templateUrl : "../app/pages/edit.html"
                });
    }
})();