'use strict';

angular.module('blogComponents').component('editArticle', {
    templateUrl: '../app/templates/edit_article.html',
    controller:  editController});


function editController($scope,$routeParams, blogArticleService){
    var  id, result;
    this.articleId = $routeParams.articleId;
    id = this.articleId;
    this.articleToEdit = blogArticleService.getArticles.query();
    this.articleToEdit.$promise.then(
        function (data) {
            data.forEach(function(items) {
                if(items.id === id) {
                    $scope.article = items;
                }
            });
            return  result;
        },
        function (error) {
            console.log(error);
        }
    );



    this.submit = function () {
        var data, dateOfEditedArticle, stringTagBuffer;
        dateOfEditedArticle = new Date();

        stringTagBuffer = this.editData.tags;
        this.editData.id = id;
        this.editData.time = blogArticleService.dateFormat(dateOfEditedArticle.format(), "HH:MM mmm dd, yyyy");
        this.editData.tags = stringTagBuffer.split(",");

        data = this.editData;
        blogArticleService.saveArticle.save(data,

            function (savedData) {
                console.log(savedData);
            },
            function () {
                console.error('error in posting');
            }
        );
    };

    this.delete = function () {
        var dataToDelete = {id:  this.articleId};
        blogArticleService.deleteArticle.save(dataToDelete);
    };

}