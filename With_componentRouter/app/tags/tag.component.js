'use strict';

angular.module('tag', ['ngComponentRouter']).component('tagComponent', {
    templateUrl: 'templates/tags.template.html',
    controller: tagController,
    bindings: {
        tag: '<'
    }
});

function tagController($scope) {

    this.changeInputWithTag = tag => {
        $scope.$emit('TagOnClick', tag);
    };


}
