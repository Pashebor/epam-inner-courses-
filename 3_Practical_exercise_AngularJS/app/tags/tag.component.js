'use strict';
import  angular from 'angular';

angular.module('tagModule').component('tagComponent', {
    templateUrl: 'templates/tags.template.html',
    controller: TagController,
    bindings: {
        tag: '<'
    }
});

TagController.$inject = ['$scope'];

function TagController($scope) {

    this.changeInputWithTag = tag => {
        $scope.$emit('TagOnClick', tag);
        return tag;
    };


}
