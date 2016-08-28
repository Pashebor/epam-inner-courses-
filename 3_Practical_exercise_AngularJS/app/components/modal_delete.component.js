'use strict';

angular.module('blogComponents').controller('ModalController', ModalController);

function ModalController($uibModalInstance, id, articles, blogArticleService) {
    let that = this;
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
        let dataToDelete = {id: id};
        blogArticleService.deleteArticle.save(dataToDelete,
        data => {
            that.show = true;
            that.hide = true;
            console.log(data);
        },
        () => console.log('Error!'));
    };

    this.cancel = () => $uibModalInstance.dismiss();

}