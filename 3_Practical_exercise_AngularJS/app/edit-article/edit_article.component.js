'use strict';

angular.module('editArticleModule').component('editArticle', {
    templateUrl: 'templates/edit_article.template.html',
    controller:  EditController,
    bindings: {
        articles: '='
    }
});


function EditController($scope, $routeParams, blogArticleService, $uibModal){

    const ID = $routeParams.articleId;
    const that = this;

    let showArticles = () => {
      this.articles.list.forEach(items => {
          if(items.id === ID) {
               that.article = items;
      }});
      return that.article;
    }

    showArticles();

    this.submit = () => {

        this.show = !this.show;
        let data, dateOfEditedArticle, stringTagBuffer;

        let showEditedTags = (articles, tagsData) => {
            var editedTags = [];

            articles.forEach(items => {
               var tags = items.tags;
                tags.forEach(tag => {
                    if(editedTags.indexOf(tag.trim()) === -1) {
                        editedTags.push(tag);
                    }
                });

                tagsData.splice(0, tagsData.length);
                editedTags.forEach(item => {
                    tagsData.push(item);
                });

                return tagsData.tags;
            });

        };

        dateOfEditedArticle = new Date();
        stringTagBuffer = this.editData.tags;
        this.editData.id = ID;
        this.editData.time = blogArticleService.dateFormat(dateOfEditedArticle.format(), "HH:MM mmm dd, yyyy");
        this.editData.tags = stringTagBuffer.trim().split(",");


        data = this.editData;

        blogArticleService.articlesData.update({edited_data: data}, response => {

            that.alert = 'Article has been changed.';
            that.alertClass = '';
            that.alertClass = 'edit-article__alert-window';

            that.articles.list = response.respData;

            showEditedTags(that.articles.list, that.articles.tags);
            showArticles();

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
                articles: () => {return that.articles.list;}
            }
        });
        modalInstance.result.then(id => {
 
          let dataToDelete = id;
          blogArticleService.articlesData.delete({edited_data: dataToDelete}, response => {

            console.log(response);
            // that.articles.list = response.respDataDelete;
            // that.articles.list.forEach(item => {
            //     if (item.id === id) {
            //         that.articles.tags.forEach( (itemFirst, i, array1) => {
            //             item.tags.forEach( (itemSecond, j, array2) => {
            //                 if (array1[i] === array2[j]) {
            //                     array1.splice(i, 1);
            //                 }
            //             })
            //         });
            //         let index = that.articles.list.indexOf(item);
            //         that.articles.list.splice(index, 1);
            //     }
            // })
          },
          () => console.log('Error!'));
        })
    };



}
