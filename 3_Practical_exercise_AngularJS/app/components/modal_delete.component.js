'use strict';

angular.module('blogComponents').controller('ModalController', ModalController);

function ModalController($uibModalInstance, id, articles, blogArticleService) {
    var that = this;
    this.show = false;
    this.hide = false;

    articles.$promise.then(function(data) {
        data.forEach(function(item) {
              if(item.id === id) {
                  that.articleName = item.header;
              }
        });
    });

    this.ok = function () {
        $uibModalInstance.close(id);
    };

    this.delete = function(){
        var dataToDelete = {id: id};
        blogArticleService.deleteArticle.save(dataToDelete,
        function(data) {
            that.show = true;
            that.hide = true;
            console.log(data);
        },
        function() {
            console.log('Error!');
        });
    };

    this.cancel = function() {
        $uibModalInstance.dismiss();
    };

}