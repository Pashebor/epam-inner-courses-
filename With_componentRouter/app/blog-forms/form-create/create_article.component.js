'use strict';

    angular.module('create', ['ngComponentRouter']).component('createArticle', {
        templateUrl: 'templates/forms.template.html',
        controller: createArticleController
    });

            function createArticleController (blogArticleService) {
                const that = this;
                this.show = false;

                this.switchTepmplate = 'create';

                this.createArticleBtn =  () => {
                    this.show = !this.show;

                    let dateOfCreatedArticle = new Date(), formData, stringTagsBuffer;

                    stringTagsBuffer = this.createData.tags;
                    this.createData.tags = stringTagsBuffer.trim().split(",");
                    this.createData.time = blogArticleService.dateFormat(dateOfCreatedArticle.format(), "HH:MM mmm dd, yyyy");
                    formData = this.createData;


                    blogArticleService.articlesData.create({edited_data: JSON.stringify(formData)},

                         response => {
                            that.alert = 'Article created.';
                            that.alertClass = '';
                            that.alertClass = 'edit-article__alert-window';
                            blogArticleService.addArticle(response.respDataCreate);

                        },
                        () => {
                            that.alert = 'Error in creating!';
                            that.alertClass = '';
                            that.alertClass = 'edit-article__alert-window--error';
                            console.error('Error in saving');
                        });
                }
            }
