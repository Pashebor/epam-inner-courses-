'use strict';

    angular.module('createArticleModule').component('createArticle', {
        templateUrl: 'templates/create_article.template.html',
        controller: createArticleController,
        bindings: {
            articles: '<'
        }
    });

            function createArticleController (blogArticleService) {
                const that = this;
                this.show = false;

                /*var tagsWithoutDuplicates = jsonData => {
                    var allTags = [];

                    jsonData.forEach(function (item) {
                        var tags = item.tags;
                        tags.forEach(function (tag){
                            if (allTags.indexOf(tag.trim()) === -1) {
                                allTags.push(tag);
                            }
                        });
                    });

                    return allTags;
                }*/

                this.createArticleBtn =  () => {
                    this.show = !this.show;
                    let dateOfCreatedArticle = new Date(), formData, stringTagsBuffer;
                    let ids = [], largestDigitID;



                    this.articles.list.forEach( item => ids.push(item.id));
                    largestDigitID = Math.max.apply(Math, ids);

                    this.createData.id = "" + (largestDigitID + 1);
                    stringTagsBuffer = this.createData.tags;
                    this.createData.tags = stringTagsBuffer.trim().split(",");
                    this.createData.time = blogArticleService.dateFormat(dateOfCreatedArticle.format(), "HH:MM mmm dd, yyyy");
                    formData = this.createData;

                    blogArticleService.articlesData.create({edited_data: JSON.stringify(formData)},

                         response => {
                            that.alert = 'Article created.';
                            that.alertClass = '';
                            that.alertClass = 'edit-article__alert-window';
                            that.articles.list = response.respDataCreate;
                            /*mergeTwoArraysWithoutDuplicates(addedTags, arrayNoDuplicates, that.articles.tags);*/
                            console.log(formData);

                        },
                        () => {
                            that.alert = 'Error in creating!';
                            that.alertClass = '';
                            that.alertClass = 'edit-article__alert-window--error';
                            console.error('Error in saving');
                        });
                }
            }
