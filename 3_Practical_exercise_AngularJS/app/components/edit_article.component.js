'use strict';

angular.module('blogComponents').component('editArticle', {
    templateUrl: '/templates/edit_article.html',
    controller:  EditController,
    bindings: {
        articles: '='
    }
});


function EditController($scope, $routeParams, blogArticleService, $uibModal){
    let  id, that = this;
    this.articleId = $routeParams.articleId;
    id = this.articleId;

    this.articles.list.forEach(items => {if(items.id === id) {that.article = items;}});


    this.submit = () => {

        this.show = !this.show;
        let data, dateOfEditedArticle, stringTagBuffer;

        dateOfEditedArticle = new Date();
        stringTagBuffer = this.editData.tags;
        this.editData.id = id;
        this.editData.time = blogArticleService.dateFormat(dateOfEditedArticle.format(), "HH:MM mmm dd, yyyy");
        this.editData.tags = stringTagBuffer.split(",");

        data = this.editData;

        this.articles.list.forEach(item => {
            let itemId = item.id, editedItem = id;
            if(itemId == editedItem){
                item.author = data.author;
                item.header = data.header;
                item.text = data.text;
                item.tags = data.tags;
                item.image = data.image;
                item.time = data.time;
            }
        });

        blogArticleService.saveArticle.save(data,

            savedData => {
                that.alert = 'Article has been changed.';
                that.alertClass = '';
                that.alertClass = 'edit-article__alert-window';
                console.log('Article edited');
            },
            () => {
                that.alert = 'Error in posting!';
                that.alertClass = '';
                that.alertClass = 'edit-article__alert-window--error';
                console.error('error in posting');
            }
        );
    };

    this.delete = size => {


        let modalInstance = $uibModal.open({
            templateUrl: '/templates/modal_delete.html',
            controller: 'ModalController as ctrl',
            scope: $scope,
            size: size,
            backdrop: 'static',
            resolve:{
                id: () => {return id;},
                articles: () => {return that.articles.list;}
            }
        });
        modalInstance.result.then(id => {
            that.articles.list.forEach(item => {
                if (item.id === id) {
                    let index = that.articles.list.indexOf(item);
                    that.articles.list.splice(index, 1);
                }
            })
        })
    };



}

