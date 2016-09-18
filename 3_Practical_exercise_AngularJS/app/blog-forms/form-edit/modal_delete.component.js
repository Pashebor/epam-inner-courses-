'use strict';

angular.module('editArticleModule').controller('ModalController', ModalController);

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
