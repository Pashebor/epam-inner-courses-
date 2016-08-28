'use strict';

angular.module('blogComponents').component('startBlog', {
    templateUrl: '/templates/start_page.html',
    controller: blogController,
    bindings: {
        articles: '='
    }
});

function blogController(){
    var that = this;
    this.searchInput = document.getElementById('searchInput').value;

    this.blog = this.articles.list;
    this.tags = this.articles.tags;

    this.changeInput = function (){
        that.searchInput;
    };

    this.changeInputWithTag = function (tag) {
        that.searchInput = '' + tag;
    };



}