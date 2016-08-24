'use strict';

    angular.module('blogComponents').component('createArticle', {
        templateUrl: '../app/templates/create_article.html',
        controller: createArticleController});

            function createArticleController ($scope, blogArticleService) {
                this.show = false;
                this.createArticleBtn = function () {
                    this.show = !this.show;
                    var dateOfCreatedArticle = new Date(), formData, stringTagsBuffer;

                    stringTagsBuffer = this.createData.tags;
                    this.createData.tags = stringTagsBuffer.split(",");
                    this.createData.time = blogArticleService.dateFormat(dateOfCreatedArticle.format(), "HH:MM mmm dd, yyyy");
                    formData = this.createData;

                    blogArticleService.createArticleEnd.save(formData,

                        function (savedData) {
                            $scope.alert = 'Article created';
                            $scope.alertClass = '';
                            $scope.alertClass = 'edit-article__alert-window';
                            console.log('Article created');
                        },
                        function (savedData) {
                            $scope.alert = 'Error in creating!';
                            $scope.alertClass = '';
                            $scope.alertClass = 'edit-article__alert-window--error';
                            console.error('Error in saving');
                        });
                }
            }
