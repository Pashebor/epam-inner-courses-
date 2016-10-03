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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(12);

/***/ },

/***/ 12:
/***/ function(module, exports) {

	'use strict';

	/*Blog Component test*/

	describe('component: blog.component.js', function () {

	    beforeEach(angular.mock.module('blogModule'));

	    describe('Blog Controller', function () {

	        var $componentController;
	        var BlogService, httpBackend;
	        var $scope, $rootScope;

	        var data = {
	            articles: {
	                "id": "1",
	                "author": "E. Hyperraccoon",
	                "image": "images/flowers.png",
	                "header": "Blogotitle of blogopost about blogoflowers",
	                "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	                "time": "22:58 Jan 01, 2014",
	                "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]
	            }
	        };

	        beforeEach(inject(function (_$componentController_, _BlogService_, _$rootScope_, $httpBackend) {
	            httpBackend = $httpBackend;
	            $rootScope = _$rootScope_;
	            $scope = $rootScope.$new();
	            BlogService = _BlogService_;
	            $componentController = _$componentController_('blogComponent', { $scope: $scope }, BlogService, null);
	        }));

	        afterEach(function () {
	            httpBackend.verifyNoOutstandingExpectation();
	            httpBackend.verifyNoOutstandingRequest();
	        });

	        it('should get articles for blog template', function () {
	            httpBackend.expectGET('/articles').respond(data);
	            var response = BlogService.get();
	            httpBackend.flush();
	            dump(response);
	            expect(response).toEqual(data.articles);
	        });

	        // it('should accept an event click from Tag component', function () {
	        //     $scope.$emit('TagOnClick', 'Tag name');
	        //     expect($componentController.search).toEqual('Tag name');
	        //     dump($componentController.search);
	        // });

	    });
	});

	/********/

/***/ }

/******/ });