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

	__webpack_require__(34);

	__webpack_require__(35);

	__webpack_require__(36);

	__webpack_require__(37);

/***/ },

/***/ 34:
/***/ function(module, exports) {

	'use strict';

	/*Blog Component test*/

	describe('component: blog.component.js', function () {

	            beforeEach(angular.mock.module('blogModule'));

	            describe('Blog Controller', function () {

	                        var $componentController;
	                        var blogService;
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

	                        beforeEach(inject(function (_$componentController_, _blogService_, _$rootScope_) {
	                                    $rootScope = _$rootScope_;
	                                    $scope = $rootScope.$new();
	                                    blogService = _blogService_;
	                                    $componentController = _$componentController_('blogComponent', { $scope: $scope }, blogService, null);
	                        }));

	                        it('should get articles from server with a service', function () {
	                                    expect($componentController.getArticles).toBeDefined();
	                        });

	                        it('should accept an event click from Tag component', function () {
	                                    $scope.$broadcast('TagOnClick', 'Tag name');
	                                    expect($componentController.search).toEqual('Tag name');
	                                    dump($componentController.search);
	                        });
	            });
	});

	/********/

/***/ },

/***/ 35:
/***/ function(module, exports) {

	'use strict';
	/*Blog Service test*/

	describe('Blog Service', function () {

	    beforeEach(angular.mock.module("blogModule"));

	    var httpBackend, blogService;

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

	    var obj = {
	        "id": "1",
	        "author": "E. Hyperraccoon",
	        "image": "images/flowers.png",
	        "header": "Blogotitle of blogopost about blogoflowers",
	        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	        "time": "22:58 Jan 01, 2014",
	        "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]
	    };
	    var arrayOfObj = [obj];

	    beforeEach(inject(function ($httpBackend, _blogService_) {
	        httpBackend = $httpBackend;
	        blogService = _blogService_;
	    }));

	    afterEach(function () {
	        httpBackend.verifyNoOutstandingExpectation();
	        httpBackend.verifyNoOutstandingRequest();
	    });

	    it('Check GET Request', function () {

	        httpBackend.expectGET('/articles_data').respond(data);

	        var response = blogService.getArticles.get();
	        var tags = blogService;
	        httpBackend.flush();
	        dump(blogService.tagsWithoutDuplicates);
	        expect(tags.tagsWithoutDuplicates(arrayOfObj)).toEqual(["Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]);
	        expect(response.articles).toEqual(data.articles);
	    });
	});

	/******/

/***/ },

/***/ 36:
/***/ function(module, exports) {

	'use strict';

	/*Tag Component test*/

	describe('component: tag.component.js', function () {

	          beforeEach(angular.mock.module('tagModule'));

	          describe('Tag Controller', function () {

	                    var $componentController, scope;
	                    var bindings = { tag: ["Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"] };

	                    beforeEach(inject(function (_$componentController_, $rootScope) {
	                              scope = $rootScope.$new();
	                              $componentController = _$componentController_('tagComponent', { $scope: scope }, bindings);
	                    }));

	                    it('should take bindings', function () {
	                              dump($componentController);
	                              expect($componentController.tag).toBeDefined();
	                              expect($componentController.tag).toEqual(["Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]);
	                    });

	                    it('should accept an event click from Tag component', function () {
	                              var tag = 'Racoon';
	                              expect($componentController.changeInputWithTag(tag)).toEqual(tag);
	                    });
	          });
	});

	/********/

/***/ },

/***/ 37:
/***/ function(module, exports) {

	'use strict';

	/*Forms test*/

	describe('Form Service', function () {

	      beforeEach(angular.mock.module("formsModule"));

	      var httpBackend, formsService;
	      var putData = {
	            data: { "id": "1",
	                  "author": "E. Hyperraccoon",
	                  "image": "images/flowers.png",
	                  "header": "Blogotitle of blogopost about blogoflowers",
	                  "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	                  "time": "22:58 Jan 01, 2014",
	                  "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]
	            }
	      };

	      beforeEach(inject(function ($httpBackend, _formsService_) {
	            httpBackend = $httpBackend;
	            formsService = _formsService_;
	      }));

	      afterEach(function () {
	            httpBackend.verifyNoOutstandingExpectation();
	            httpBackend.verifyNoOutstandingRequest();
	      });

	      it('REST for forms', function () {
	            //dump(formsService.articlesData.update({putData}));
	            httpBackend.expectPUT('/articles_data?data=1').respond('1');
	            var response = formsService.articlesData.update({ data: '1' });
	            expect(response.data).toEqual('1');
	            dump(response.data);
	            httpBackend.flush();
	      });
	});

	/******/

/***/ }

/******/ });