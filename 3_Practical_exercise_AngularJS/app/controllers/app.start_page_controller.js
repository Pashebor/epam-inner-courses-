(function () {
    'use strict';
    angular.module('racoonBlog').controller('BlogController', blogController );

    function blogController($scope, blogArticleService){
        $scope.blog = blogArticleService.getArticles.query();
        $scope.blog.$promise.then(
            function (articleData) {
                articleData.forEach(function(item) {
                    $scope.articles = item;
                });
            },
            function (error) {
                console.log(error)
            });
        $scope.tags = blogArticleService.getTags.query();
    }


})();