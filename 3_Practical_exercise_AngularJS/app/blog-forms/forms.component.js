'use strict';

import angular from 'angular';
import 'angular-ui-bootstrap';
import 'angular-route';
import 'angular-resource';


angular.module('formsModule').component('formComponent', {
    templateUrl: 'templates/forms.template.html',
    controller: FormsController
});

FormsController.$inject = ['$scope', '$routeParams', '$uibModal', '$location', 'formsService'];

function FormsController($scope, $routeParams, $uibModal, $location, formsService) {
    const id = $routeParams.id;

    const vm = this;

    vm.article= new formsService;
    vm.showAlert = false;

    vm.isNewPost = () =>  !!id;

    if (id != undefined) {
        vm.article.$get({id: id});
    }

    vm.submit = (formData) => {
        if (formData.tags) {
            formData.tags = formData.tags.split(",");
        }
        formData.time = new Date();

        vm.showAlert = !vm.showAlert;

        if(id) {
            vm.article.$update(response => {
                vm.alert = 'Article has been changed.';
                vm.isError = false;
                vm.article = response;
            }, () => {
                vm.alert = 'Error in posting!';
                vm.isError = true;
            });
     } else {
            vm.article.$save(() => {
                vm.alert = 'Article created.';
                vm.isError = false;
            },() => {
                vm.alert = 'Error in creating!';
                vm.isError = true;
            });
     }
    };

    vm.openModal = () => {

      vm.modalInstance = $uibModal.open({
        templateUrl: 'templates/modal_delete.template.html',
        controller: 'ModalController as ctrl',
        scope: $scope,
        size: "sm",
        backdrop: 'static',
        resolve:{
          article: vm.article
        }
      });

      vm.modalInstance.result.then(() => {
        vm.article.$delete(() => {
          $location.path('/');
        },() => {
          console.log('Error!')
        });
      });
    };

}
