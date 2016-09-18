'use strict';

angular.module('blog', ['ngComponentRouter', 'tag']).component('startBlog', {
    templateUrl: 'templates/start_page.template.html',
    controller: blogController
});

function blogController($scope, blogArticleService){
    let articles = blogArticleService.getArticles;

    let that = this;

    let createdArticle = blogArticleService.getArticleList();
    let editedArticle = blogArticleService.getEditedArticle();
    let deletedArticle = blogArticleService.getDelArticle();


    if (deletedArticle != null){
      // window.location.reload();
      articles.forEach( (item, i, array) => {
             if (array[i].id === deletedArticle.id) {
                 var index = array.indexOf(array[i]);
                 array.splice(index, 1);
             }
      });
      // $state.reload();
    }

    if (editedArticle != null){
        console.log(editedArticle);
        articles.forEach( item => {
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
        articles.push(createdArticle);
    }

    $scope.$on('TagOnClick',  (event, tagName) =>{
        that.search = tagName;
    });



    this.blog = articles;
    console.log(articles);
    this.tags = blogArticleService.tagsWithoutDuplicates(articles);

}
