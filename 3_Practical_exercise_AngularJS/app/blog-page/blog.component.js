'use strict';

import  angular from 'angular';
import 'angular-resource';

angular.module('blogModule').component('blogComponent', {
    templateUrl: 'templates/blog.template.html',
    controller: BlogController
});

BlogController.$inject = ['$rootScope','blogService', '$resource'];

function BlogController($rootScope, blogService, $resource){

    let vm = this;
    let articles = $resource('/articles_data');

    articles.query(resp => {
      vm.blog = resp;
      vm.tags = blogService.tagsWithoutDuplicates(resp);
    });

    $rootScope.$on('TagOnClick',  (event, tagName) =>{
        vm.search = tagName;
    });


}
