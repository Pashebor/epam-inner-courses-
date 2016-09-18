'use strict';

angular.module('edit', ['ngComponentRouter']).component('editArticle', {
    templateUrl: 'templates/forms.template.html',
    controller:  EditController
});


function EditController($scope, blogArticleService, $uibModal, $location){

    this.$routerCanReuse();

    const ID = '5';
    const that = this;

    this.switchTepmplate = 'edit';

    blogArticleService.articlesData.get({edited_data: JSON.stringify(ID)}, response => {
        console.log(response.header);
        that.article = response;
    });

    this.submit = () => {

        this.show = !this.show;
        let data, dateOfEditedArticle, stringTagBuffer;



        dateOfEditedArticle = new Date();
        stringTagBuffer = this.editData.tags;
        this.editData.id = ID;
        this.editData.time = blogArticleService.dateFormat(dateOfEditedArticle.format(), "HH:MM mmm dd, yyyy");
        this.editData.tags = stringTagBuffer.trim().split(",");


        data = this.editData;

        blogArticleService.articlesData.update({edited_data: JSON.stringify(data)}, response => {

            that.alert = 'Article has been changed.';
            that.alertClass = '';
            that.alertClass = 'edit-article__alert-window';

            that.article = response.editedArticle;
            blogArticleService.addEditedArticle(response.editedArticle);

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

          let dataToDelete = {id: id};
          blogArticleService.articlesData.delete({edited_data: JSON.stringify(dataToDelete)}, response => {
              blogArticleService.addDelArticle(dataToDelete);
              $location.path('/');
          },
          () => console.log('Error!'));
        })

    };

}
