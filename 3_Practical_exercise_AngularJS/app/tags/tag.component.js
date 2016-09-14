'use strict';

angular.module('tagModule').component('tagComponent', {
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