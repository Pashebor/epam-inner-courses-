'use strict';

import angular from 'angular';
import 'angular-ui-bootstrap';
import 'angular-route';


angular.module('formsModule').component('formComponent', {
    templateUrl: 'templates/forms.template.html',
    controller: FormsController
});

FormsController.$inject = ['$scope', '$routeParams', 'formsService', '$uibModal', '$location'];

function FormsController($scope, $routeParams, formsService, $uibModal, $location) {
    const that = this;

    this.show = false;
    console.log($routeParams.id);
    switch (typeof $routeParams.id) {

        case 'undefined':

            this.switchTepmplate = 'create';

            this.createArticleBtn =  () => {
                this.show = !this.show;

                let dateOfCreatedArticle = `${new Date().toLocaleString("en-US", {minute: 'numeric',hour: 'numeric',hour12: false})} ${new Date().toLocaleString("en-US", {year: 'numeric',month: 'short',day: 'numeric'})}`;
                let formData, stringTagsBuffer;

                stringTagsBuffer = this.createData.tags;
                this.createData.tags = stringTagsBuffer.trim().split(",");
                this.createData.time = dateOfCreatedArticle;
                formData = this.createData;


                formsService.createArticle.save({data: formData} ,

                    () => {
                        that.alert = 'Article created.';
                        that.alertClass = '';
                        that.alertClass = 'edit-article__alert-window';

                    },
                    () => {
                        that.alert = 'Error in creating!';
                        that.alertClass = '';
                        that.alertClass = 'edit-article__alert-window--error';
                        console.error('Error in saving');
                    });
            };

            break;

        case 'string':
            this.switchTepmplate = 'edit';

            const ID = $routeParams.id;
            formsService.article.get({id: ID}, response => {
                console.log(response.header);
                that.article = response;
            });

            this.submit = () => {

                this.show = !this.show;
                let data, dateOfEditedArticle, stringTagBuffer;



                dateOfEditedArticle = `${new Date().toLocaleString("en-US", {minute: 'numeric',hour: 'numeric',hour12: false})} ${new Date().toLocaleString("en-US", {year: 'numeric',month: 'short',day: 'numeric'})}`;
                 stringTagBuffer = this.editData.tags;
                this.editData.id = ID;
                this.editData.time = dateOfEditedArticle;
                this.editData.tags = stringTagBuffer.trim().split(",");


                data = this.editData;

                formsService.articlesData.update({data: data}, response => {

                    that.alert = 'Article has been changed.';
                    that.alertClass = '';
                    that.alertClass = 'edit-article__alert-window';

                    that.article = response.editedArticle;

                    console.log('Article edited');
                }, () => {
                    that.alert = 'Error in posting!';
                    that.alertClass = '';
                    that.alertClass = 'edit-article__alert-window--error';
                    console.error('error in posting');
                });


            };

            this.delete = size => {


                let modalInstance = $uibModal.open({
                    templateUrl: 'templates/modal_delete.template.html',
                    controller: 'ModalController as ctrl',
                    scope: $scope,
                    size: size,
                    backdrop: 'static',
                    resolve:{
                        id: () => {return ID;},
                        article: this.article
                    }
                });

                modalInstance.result.then(id => {

                    formsService.article.delete({id: id}, () => {

                            $location.path('/');
                        },
                        () => console.log('Error!'));
                })

            };

            break;

    }

}