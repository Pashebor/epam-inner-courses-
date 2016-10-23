'use strict';
import angular from 'angular';
import 'angular-ui-bootstrap';

angular.module('formsModule').controller('ModalController', ModalController);

ModalController.$inject = ['$uibModalInstance', 'article'];

function ModalController($uibModalInstance,  article) {
    const vm = this;

    vm.articleName = article.header;

    vm.ok = () => $uibModalInstance.close();

    vm.delete = () => {
      vm.hideButton = true;
    };

    vm.cancel = () => $uibModalInstance.dismiss();

}
