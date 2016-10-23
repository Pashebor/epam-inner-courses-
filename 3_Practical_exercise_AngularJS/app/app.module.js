'use strict';
import angular from 'angular';
import 'angular-route';
import 'angular-resource';
import 'angular-ui-bootstrap';

angular.module('racoonBlog', ['ngRoute', 'ngResource', 'ui.bootstrap', 'formsModule', 'blogModule', 'tagModule']);
