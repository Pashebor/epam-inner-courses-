'use strict';

angular.module('blogComponents').component('startBlog', {
    templateUrl: '../app/templates/start_page.html',
    controller: blogController});

function blogController($scope, blogArticleService){
    this.blog = blogArticleService.getArticles.query();
    this.tags = blogArticleService.getTags.query();
}