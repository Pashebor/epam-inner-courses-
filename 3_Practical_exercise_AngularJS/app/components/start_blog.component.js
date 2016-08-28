'use strict';

angular.module('blogComponents').component('startBlog', {
    templateUrl: '/templates/start_page.html',
    controller: blogController,
    bindings: {
        articles: '='
    }
});

function blogController(){
    let that = this;
    this.searchInput = document.getElementById('searchInput').value;

    this.blog = this.articles.list;
    this.tags = this.articles.tags;

    this.changeInput = () => that.searchInput;

    this.changeInputWithTag = tag => that.searchInput = '' + tag;



}