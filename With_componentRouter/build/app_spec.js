/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	/*App controller testing*/

	describe('test main controller', function () {
	    beforeEach(angular.mock.module('racoonBlog'));

	    var $controller;

	    beforeEach(inject(function (_$controller_) {

	        $controller = _$controller_;
	    }));

	    describe('shared data in it', function () {
	        it('should expose all functions', function () {
	            var controller = $controller('AppController');
	            dump(controller);
	            expect(controller).toBeDefined();
	        });
	        it('result of sum func', function () {
	            var controller = $controller('AppController');
	            dump(controller.sum());
	            expect(controller.sum()).toEqual(5);
	        });
	    });
	});

	/********/

	/*Start page component testing*/

	describe('component: start_blog.component.js', function () {

	    beforeEach(angular.mock.module('startBlogModule'));

	    describe('StartPageController', function () {

	        var ctrl;

	        beforeEach(inject(function ($componentController) {
	            var bindings = { articles: '=' };
	            ctrl = $componentController('startBlog', null, bindings);
	        }));

	        it('should expose a controller with his properties', function () {
	            dump(ctrl);
	            expect(ctrl.blog).toBe();
	            expect(ctrl.tags).toBe();
	            expect(ctrl.changeInputWithTag).toBeDefined();
	        });
	    });
	});

	/********/

	/*Edit Article page component testing*/

	describe('component: edit_article.component.js', function () {

	    beforeEach(angular.mock.module('editArticleModule'));

	    describe('EditArticleController', function () {

	        var ctrl;

	        beforeEach(inject(function ($componentController) {

	            var blogArticleService;

	            var bindings = { articles: '=' };
	            ctrl = $componentController('editArticle', { blogArticleService: blogArticleService }, bindings);
	        }));

	        it('should expose a controller with his properties', function () {
	            dump(ctrl);
	            /*expect($scope.id).toBe('PG_FIRST');*/
	        });
	    });
	});

	/********/

/***/ }
/******/ ]);