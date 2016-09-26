'use strict';
import angular from 'angular';
import 'angular-ui-bootstrap';

angular.module('formsModule').controller('ModalController', ModalController);

ModalController.$inject = ['$uibModalInstance', 'id', 'article'];

function ModalController($uibModalInstance, id, article) {
    const that = this;
    this.show = false;
    this.hide = false;

    that.articleName = article.header;

    this.ok = () => $uibModalInstance.close(id);

    this.delete = () => {
      that.show = true;
      that.hide = true;
    };

    this.cancel = () => $uibModalInstance.dismiss();

}
