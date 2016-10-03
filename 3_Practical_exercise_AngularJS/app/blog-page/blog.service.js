
'use strict';

import angular from 'angular';
import 'angular-resource';


angular.module('blogModule').factory('BlogService', ($resource) => {
  return $resource('/articles');
});
