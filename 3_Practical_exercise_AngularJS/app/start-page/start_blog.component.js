'use strict';

angular.module('startBlogModule').component('startBlog', {
    templateUrl: 'templates/start_page.template.html',
    controller: blogController,
    bindings: {
        articles: '<'
    }
});

function blogController($scope ,blogArticleService, FormService, $location, $route){
    let that = this;

    let createdArticle = FormService.getArticleList();
    let editedArticle = FormService.getEditedArticle();
    let deletedArticle = FormService.getDelArticle();


    if (deletedArticle != null){
      // window.location.reload();
      this.articles.list.forEach( (item, i, array) => {
             if (array[i].id === deletedArticle.id) {
                 var index = array.indexOf(array[i]);
                 array.splice(index, 1);
             }
      });
      // $state.reload();
    }

    if (editedArticle != null){
        console.log(editedArticle);
        this.articles.list.forEach( item => {
           if (item.id === editedArticle.id) {
               item.author = editedArticle.author;
               item.header = editedArticle.header;
               item.text = editedArticle.text;
               item.tags = editedArticle.tags;
               item.image = editedArticle.image;
               item.time = editedArticle.time;
           }
        });
    }

    if (createdArticle != null) {
        console.log(createdArticle);
        this.articles.list.push(createdArticle);
    }

    $scope.$on('TagOnClick',  (event, tagName) =>{
        that.search = tagName;
    });

    this.blog = this.articles.list;
    this.tags = blogArticleService.tagsWithoutDuplicates(this.articles.list);


}
