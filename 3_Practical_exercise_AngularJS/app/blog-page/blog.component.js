'use strict';

import  angular from 'angular';

angular.module('blogModule').component('blogComponent', {
    templateUrl: 'templates/blog.template.html',
    controller: BlogController
});

BlogController.$inject = ['$scope','BlogService'];

function BlogController($scope , BlogService){

    let vm = this;
    let articles = BlogService;

    let tagsWithoutDuplicates = articles => {
        let allTags = [];

        articles.forEach(function (item) {
            let tags = item.tags;
            tags.forEach(function (tag){

                if (allTags.indexOf(tag.trim()) === -1) {
                    allTags.push(tag);
                }
            });
        });

        return allTags;
    };

    articles.query(resp => {
      vm.blog = resp;
      //vm.tags = tagsWithoutDuplicates(resp);
    });

    $scope.$on('TagOnClick',  (event, tagName) =>{
        vm.search = tagName;
    });


}
