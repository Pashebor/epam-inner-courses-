'use strict';

    angular.module('createArticleModule').component('createArticle', {
        templateUrl: 'templates/create_article.template.html',
        controller: createArticleController,
        bindings: {
            articles: '='
        }
    });

            function createArticleController (blogArticleService) {
                const that = this;
                this.show = false;


                this.createArticleBtn = function () {
                    this.show = !this.show;
                    let dateOfCreatedArticle = new Date(), formData, stringTagsBuffer;
                    let ids = [], largestDigitID, addedTags = [], arrayNoDuplicates = [];

                    let mergeTwoArraysWithoutDuplicates = function(firstArray, secondArray, tagsData) {
                        for (let i = 0; i < firstArray.length; i++) {
                            tagsData.push(firstArray[i]);
                        }

                        tagsData.forEach(item => {
                            if (secondArray.indexOf(item.trim()) === -1) {
                                secondArray.push(item);
                            }
                        });

                        tagsData.splice(0, tagsData.length);

                        secondArray.forEach(item => {
                            tagsData.push(item);
                        });

                        return tagsData.tags;
                    }

                    this.articles.list.forEach( item => ids.push(item.id));
                    largestDigitID = Math.max.apply(Math, ids);

                    this.createData.id = "" + (largestDigitID + 1);
                    stringTagsBuffer = this.createData.tags;
                    this.createData.tags = stringTagsBuffer.trim().split(",");
                    addedTags = this.createData.tags;
                    this.createData.time = blogArticleService.dateFormat(dateOfCreatedArticle.format(), "HH:MM mmm dd, yyyy");
                    formData = this.createData;

                    blogArticleService.createArticleEnd.save(formData,

                         savedData => {
                            that.alert = 'Article created.';
                            that.alertClass = '';
                            that.alertClass = 'edit-article__alert-window';
                            that.articles.list.push(formData);
                            mergeTwoArraysWithoutDuplicates(addedTags, arrayNoDuplicates, that.articles.tags);
                            console.log(formData);

                        },
                        savedData => {
                            that.alert = 'Error in creating!';
                            that.alertClass = '';
                            that.alertClass = 'edit-article__alert-window--error';
                            console.error('Error in saving');
                        });
                }
            }
