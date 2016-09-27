'use strict';

import angular from 'angular';
import 'angular-ui-bootstrap';
import 'angular-route';


angular.module('formsModule').component('formComponent', {
    templateUrl: 'templates/forms.template.html',
    controller: FormsController
});

FormsController.$inject = ['$scope', '$routeParams', 'blogService', '$uibModal', '$location'];

function FormsController($scope, $routeParams, blogService, $uibModal, $location) {
    const vm = this;

    vm.show = false;

    console.log($routeParams.id);

    switch (typeof $routeParams.id) {

        case 'undefined':

            vm.switchTepmplate = 'create';

            vm.createArticleBtn =  () => {
                vm.show = !vm.show;

                let dateOfCreatedArticle = `${new Date().toLocaleString("en-US", {minute: 'numeric',hour: 'numeric',hour12: false})} ${new Date().toLocaleString("en-US", {year: 'numeric',month: 'short',day: 'numeric'})}`;
                let formData, stringTagsBuffer;

                stringTagsBuffer = vm.createData.tags;
                vm.createData.tags = stringTagsBuffer.trim().split(",");
                vm.createData.time = dateOfCreatedArticle;
                formData = vm.createData;


                blogService.save({data: formData} ,

                    () => {
                        vm.alert = 'Article created.';
                        vm.alertClass = '';
                        vm.alertClass = 'edit-article__alert-window';

                    },
                    () => {
                        vm.alert = 'Error in creating!';
                        vm.alertClass = '';
                        vm.alertClass = 'edit-article__alert-window--error';
                        console.error('Error in saving');
                    });
            };

            break;

        case 'string':
            vm.switchTepmplate = 'edit';

            const ID = $routeParams.id;
            blogService.get({id: ID}, response => {
                console.log(response.header);
                vm.article = response;
            });

            vm.submit = () => {

                vm.show = !vm.show;
                let data, dateOfEditedArticle, stringTagBuffer;



                dateOfEditedArticle = `${new Date().toLocaleString("en-US", {minute: 'numeric',hour: 'numeric',hour12: false})} ${new Date().toLocaleString("en-US", {year: 'numeric',month: 'short',day: 'numeric'})}`;
                 stringTagBuffer = vm.editData.tags;
                vm.editData.id = ID;
                vm.editData.time = dateOfEditedArticle;
                vm.editData.tags = stringTagBuffer.trim().split(",");


                data = vm.editData;

                blogService.update({data: data}, response => {

                    vm.alert = 'Article has been changed.';
                    vm.alertClass = '';
                    vm.alertClass = 'edit-article__alert-window';

                    vm.article = response.editedArticle;

                    console.log('Article edited');
                }, () => {
                    vm.alert = 'Error in posting!';
                    vm.alertClass = '';
                    vm.alertClass = 'edit-article__alert-window--error';
                    console.error('error in posting');
                });


            };

            vm.delete = size => {


                let modalInstance = $uibModal.open({
                    templateUrl: 'templates/modal_delete.template.html',
                    controller: 'ModalController as ctrl',
                    scope: $scope,
                    size: size,
                    backdrop: 'static',
                    resolve:{
                        id: () => {return ID;},
                        article: vm.article
                    }
                });

                modalInstance.result.then(id => {

                    blogService.delete({id: id}, () => {

                            $location.path('/');
                        },
                        () => console.log('Error!'));
                })

            };

            break;

    }

}
