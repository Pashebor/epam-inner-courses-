'use strict';
import  angular from 'angular';
import 'angular-resource';

angular.module('formsModule').factory('formsService', ($resource) => {
    return $resource('/articles_data/:id', {id: '@id'}, {
        'update': { method:'PUT' }
    });

});