'use strict';
import  angular from 'angular';

angular.module('tagModule').component('tagComponent', {
    templateUrl: 'templates/tags.template.html',
    controller: TagController,
    bindings: {
        tag: '<'
    }
});

TagController.$inject = ['$rootScope'];

function TagController($rootScope) {
    let vm = this;

    vm.clickTag = tag => {
        $rootScope.$emit('TagOnClick', tag);
    };


}
