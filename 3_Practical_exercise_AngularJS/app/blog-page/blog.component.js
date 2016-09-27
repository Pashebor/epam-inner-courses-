'use strict';

import  angular from 'angular';

angular.module('blogModule').component('blogComponent', {
    templateUrl: 'templates/blog.template.html',
    controller: BlogController
});

BlogController.$inject = ['$scope','blogService'];

function BlogController($scope ,blogService){
    let vm = this;

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

    blogService.get({id: 0}, response => {
        vm.blog = response.articles;
        vm.tags = tagsWithoutDuplicates(response.articles);
    });



    $scope.$on('TagOnClick',  (event, tagName) =>{
        vm.search = tagName;
    });


}
