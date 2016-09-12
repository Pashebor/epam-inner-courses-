'use strict';

angular.module('startBlogModule').component('startBlog', {
    templateUrl: 'templates/start_page.template.html',
    controller: blogController,
    bindings: {
        articles: '='
    }
});

function blogController(){

    this.blog = this.articles.list;
    this.tags = this.articles.tags;

    this.changeInputWithTag = tag => this.search = '' + tag;

}
