'use strict';

import angular from 'angular';
import 'angular-ui-bootstrap';
import 'angular-route';
import 'angular-resource';


angular.module('formsModule').component('formComponent', {
    templateUrl: 'templates/forms.template.html',
    controller: FormsController
});

FormsController.$inject = ['$scope', '$routeParams', '$uibModal', '$location', '$resource', 'FormService'];

function FormsController($scope, $routeParams, $uibModal, $location, $resource, FormService) {

  let Article = $resource('/articles_data/:id', null, {
    'update': { method:'PUT' }
  });

  let articleInstance = new Article();

  const vm = this;
  const ID = $routeParams.id;

  vm.showAlert = false;
  vm.isNewPost = () => {if (ID) {return false} return true;};

  if (ID != undefined) {
    articleInstance.$get({id: ID}, data => {
      vm.article =  data;
    });
  }

  vm.createArticleBtn =  () => {

    vm.showAlert = !vm.showAlert;

    FormService.addTagAndTime(ID, vm.formData);

    articleInstance.created = vm.formData;

    articleInstance.$save(() => {
          vm.alert = 'Article created.';
          vm.isError = true;
        },() => {
          vm.alert = 'Error in creating!';
          vm.isError = false;
        });
      };

    vm.submit = () => {

      vm.showAlert = !vm.showAlert;

      FormService.addTagAndTime(ID, vm.formData);

      articleInstance.updated = vm.formData;

      articleInstance.$update( response => {
        vm.alert = 'Article has been changed.';
        vm.isError = true;
        vm.article = response.editedArticle;
      },() => {
        vm.alert = 'Error in posting!';
        vm.isError = false;
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
        articleInstance.$delete({id: id}, () => {
          $location.path('/');
        },() => console.log('Error!'));
      });
    };

}
