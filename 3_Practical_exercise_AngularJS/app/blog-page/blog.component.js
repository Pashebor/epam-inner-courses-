'use strict';

import  angular from 'angular';

angular.module('blogModule').component('blogComponent', {
    templateUrl: 'templates/blog.template.html',
    controller: BlogController
});

BlogController.$inject = ['$scope','blogService'];

function BlogController($scope ,blogService){
    let that = this;


    blogService.getArticles.query(response => {
        that.blog = response;
        this.tags = blogService.tagsWithoutDuplicates(response);
    });



    $scope.$on('TagOnClick',  (event, tagName) =>{
        that.search = tagName;
    });


}
