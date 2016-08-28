'use strict';

    angular.module('blogComponents').component('createArticle', {
        templateUrl: '../app/templates/create_article.html',
        controller: createArticleController,
        bindings: {
            articles: '='
        }
    });

            function createArticleController (blogArticleService) {
                var that = this;
                this.show = false;

                this.createArticleBtn = function () {
                    this.show = !this.show;
                    var dateOfCreatedArticle = new Date(), formData, stringTagsBuffer;
                    var ids = [], largestDigitID, allTags = [];

                    this.articles.list.forEach(function (item) {
                        ids.push(item.id);
                    });
                    largestDigitID = Math.max.apply(Math, ids);


                    this.createData.id = "" + (largestDigitID + 1);
                    stringTagsBuffer = this.createData.tags;
                    this.createData.tags = stringTagsBuffer.split(",");
                    this.createData.time = blogArticleService.dateFormat(dateOfCreatedArticle.format(), "HH:MM mmm dd, yyyy");
                    formData = this.createData;

                    this.articles.list.push(formData);

                    console.log(this.articles.tags);


                    blogArticleService.createArticleEnd.save(formData,

                        function (savedData) {
                            that.alert = 'Article created.';
                            that.alertClass = '';
                            that.alertClass = 'edit-article__alert-window';
                            console.log('Article created');
                        },
                        function (savedData) {
                            that.alert = 'Error in creating!';
                            that.alertClass = '';
                            that.alertClass = 'edit-article__alert-window--error';
                            console.error('Error in saving');
                        });
                }
            }
