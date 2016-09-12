'use strict';

angular.module('editArticleModule').controller('ModalController', ModalController);

function ModalController($uibModalInstance, id, articles, blogArticleService) {
    const that = this;
    this.show = false;
    this.hide = false;

    articles.$promise.then(data => {
        data.forEach(item => {
              if(item.id === id) {
                  that.articleName = item.header;
              }
        });
    });

    this.ok = () => $uibModalInstance.close(id);

    this.delete = () => {
      that.show = true;
      that.hide = true;
    };

    this.cancel = () => $uibModalInstance.dismiss();

}
