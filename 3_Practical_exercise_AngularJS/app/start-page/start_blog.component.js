'use strict';

angular.module('startBlogModule').component('startBlog', {
    templateUrl: 'templates/start_page.template.html',
    controller: blogController,
    bindings: {
        articles: '<'
    }
});

function blogController($scope, blogArticleService){
    let that = this;

    $scope.$on('TagOnClick',  (event, tagName) =>{
        that.search = tagName;
    });

    this.blog = this.articles.list;
    this.tags = blogArticleService.tagsWithoutDuplicates(this.articles.list);


}
