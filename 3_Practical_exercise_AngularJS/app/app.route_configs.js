'use strict';
import angular from 'angular';

angular.module('racoonBlog').config(config);

function config($routeProvider, $locationProvider){
    $routeProvider
        .when('/',  {
            template: "<blog-component class='start-blog'></blog-component>"
        })
        .when('/create/', {
            template: "<form-component  class='create-article'></form-component>"
        });

    $locationProvider.html5Mode(true);
}
