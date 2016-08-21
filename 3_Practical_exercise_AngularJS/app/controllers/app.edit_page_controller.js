(function () {
    'use strict';
    angular.module('racoonBlog').controller('EditBlogController', editController);

    function editController($scope,$routeParams, blogArticleService, $http){
        var  id, result;
        this.articleId = $routeParams.articleId;
        id = this.articleId;
        this.articleToEdit = blogArticleService.getArticles.query();
        this.articleToEdit.$promise.then(
            function (data) {
                data.forEach(function(arrayData) {

                    var arrayOfObjects = Object.keys(arrayData).map(
                        function(key) {
                            return arrayData[key]
                        });

                    arrayOfObjects.forEach(function(object) {

                        if (object.id == id) {

                            $scope.article = object;
                        }
                    });

                });
             return  result;
            },
            function (error) {
              console.log(error);
            }
        );

        this.submit = function () {
            var data;
            this.editData.id = id;
            data = this.editData;
            blogArticleService.saveArticle.save(data,

                function (savedData) {
                console.log(savedData);
            },
                function (savedData) {
                    console.error('error in posting');
                }
            );
        }
    }


})();