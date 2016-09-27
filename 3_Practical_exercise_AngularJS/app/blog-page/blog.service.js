
'use strict';

import angular from 'angular';

angular.module('blogModule').factory('blogService', function  ($resource) {


    return $resource('/articles_data/:id', null, {
        'update': { method:'PUT' }
    });
});
