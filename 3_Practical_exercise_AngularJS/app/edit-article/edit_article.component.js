'use strict';

angular.module('editArticleModule').component('editArticle', {
    templateUrl: 'templates/edit_article.template.html',
    controller:  EditController,
    bindings: {
        articles: '='
    }
});


function EditController($scope, $routeParams, blogArticleService, $uibModal){
    let  id;
    const that = this;

    id = $routeParams.articleId;

    let showListOfArticles = () => {
         this.articles.list.forEach(items => {if(items.id === id) {
             that.article = items;
         }});
        return that.article;
    };

    showListOfArticles();


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

        }

        dateOfEditedArticle = new Date();
        stringTagBuffer = this.editData.tags;
        this.editData.id = id;
        this.editData.time = blogArticleService.dateFormat(dateOfEditedArticle.format(), "HH:MM mmm dd, yyyy");
        this.editData.tags = stringTagBuffer.trim().split(",");


        data = this.editData;

        blogArticleService.saveArticle.save(data,

            savedData => {
                that.alert = 'Article has been changed.';
                that.alertClass = '';
                that.alertClass = 'edit-article__alert-window';

                that.articles.list.forEach(item => {
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

                showEditedTags(that.articles.list, that.articles.tags);

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
            templateUrl: 'templates/modal_delete.template.html',
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

          let dataToDelete = {id: id};
          blogArticleService.deleteArticle.save(dataToDelete,
          data => {
            that.articles.list.forEach(item => {
                if (item.id === id) {
                    that.articles.tags.forEach( (itemFirst, i, array1) => {
                        item.tags.forEach( (itemSecond, j, array2) => {
                            if (array1[i] === array2[j]) {
                                array1.splice(i, 1);
                            }
                        })
                    });
                    let index = that.articles.list.indexOf(item);
                    that.articles.list.splice(index, 1);
                }
            })
              console.log(data);
          },
          () => console.log('Error!'));
        })
    };



}
