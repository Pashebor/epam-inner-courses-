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

	__webpack_require__(13);

	__webpack_require__(14);

/***/ },

/***/ 12:
/***/ function(module, exports) {

	'use strict';

	/*Blog Component test*/

	describe('component: blog.component.js', function () {

	    beforeEach(angular.mock.module('blogModule'));

	    describe('Blog Controller', function () {

	        var $componentController;
	        var blogService, httpBackend;
	        var $scope, $rootScope;

	        var data = [{
	            "id": "1",
	            "author": "E. Hyperraccoon",
	            "image": "images/flowers.png",
	            "header": "Blogotitle of blogopost about blogoflowers",
	            "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	            "time": "22:58 Jan 01, 2014",
	            "tags": ["Racoon", "Racoon", "Coon", "Coon", "Dog", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]
	        }];

	        beforeEach(inject(function (_$componentController_, _blogService_, _$rootScope_, $httpBackend) {
	            httpBackend = $httpBackend;
	            $rootScope = _$rootScope_;
	            $scope = $rootScope.$new();
	            blogService = _blogService_;
	            $componentController = _$componentController_('blogComponent', { $scope: $scope }, blogService, null);
	            httpBackend.whenGET('/articles').respond(data);
	        }));

	        afterEach(function () {
	            httpBackend.verifyNoOutstandingExpectation();
	            httpBackend.verifyNoOutstandingRequest();
	        });

	        it('should get articles for blog template and remove duplicates from the tags', function () {
	            dump('Getting an articles');
	            httpBackend.flush();
	            expect($componentController.blog[0].id).toEqual(data[0].id);
	            dump('Articles received');
	            dump('Getting tags');
	            dump('Tags:  ', data[0].tags);
	            expect($componentController.tags).toEqual(["Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]);
	            dump('Tags without duplicates: ', $componentController.tags);
	            dump('**********');
	        });

	        it('should accept a click event from Tag component', function () {
	            dump('Accepting a click event from tag.component');
	            httpBackend.flush();
	            $scope.$emit('TagOnClick', $componentController.tags[0]);
	            expect($componentController.search).toEqual($componentController.tags[0]);
	            dump('Clicked tag is: ', $componentController.search);
	        });
	    });
	});

/***/ },

/***/ 13:
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
	            spyOn($componentController, 'changeInputWithTag').and.callThrough();
	        }));

	        it('should take bindings', function () {
	            dump('Test bindings');
	            dump('Bindings: ', bindings.tag);
	            expect($componentController.tag).toBeDefined();
	            expect($componentController.tag).toEqual(["Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]);
	            dump('**********');
	        });

	        it('should accept a click event  from Tag component', function () {
	            dump('A Tag click event');
	            dump('Clicked tag is: ', $componentController.changeInputWithTag($componentController.tag[1]));
	            $componentController.changeInputWithTag($componentController.tag[0]);
	            expect($componentController.changeInputWithTag($componentController.tag[0])).toEqual($componentController.tag[0]);
	            dump('**********');
	        });
	    });
	});

/***/ },

/***/ 14:
/***/ function(module, exports) {

	'use strict';

	/*Forms test*/

	describe('Forms component', function () {

	    beforeEach(angular.mock.module("formsModule"));

	    describe('Forms controller', function () {

	        var routeParams;
	        var $componentController;
	        var httpBackend;
	        var $scope, $rootScope;

	        var fakeModal = {
	            result: {
	                then: function then(confirmCallback, cancelCallback) {
	                    this.confirmCallBack = confirmCallback;
	                    this.cancelCallback = cancelCallback;
	                    return this;
	                }
	            },
	            close: function close(item) {
	                this.result.confirmCallBack(item);
	            },
	            dismiss: function dismiss(item) {
	                this.result.cancelCallback(item);
	            }
	        };

	        beforeEach(inject(function ($uibModal) {
	            spyOn($uibModal, 'open').and.returnValue(fakeModal);
	        }));

	        var data = { "id": "1",
	            "author": "E. Hyperraccoon",
	            "image": "images/flowers.png",
	            "header": "Blogotitle of blogopost about blogoflowers",
	            "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	            "time": "22:58 Jan 01, 2014",
	            "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]
	        };

	        beforeEach(inject(function (_$componentController_, $httpBackend, _$rootScope_, $routeParams, _$uibModal_) {
	            routeParams = { id: '1' };
	            httpBackend = $httpBackend;
	            $rootScope = _$rootScope_;
	            $scope = $rootScope.$new();
	            $componentController = _$componentController_('formComponent', { $scope: $scope, $routeParams: routeParams, $uibModal: _$uibModal_ }, null);
	            spyOn($componentController, 'submit').and.callThrough();
	            spyOn($componentController, 'delete').and.callThrough();
	            httpBackend.expectGET('/articles_data/1').respond(data);
	        }));

	        it('Alert element boolean and detect the id from route', function () {
	            dump('Testing bool elements');
	            dump($componentController.showAlert);
	            dump($componentController.isNewPost());
	            expect(!$componentController.showAlert).toEqual(true);
	            expect($componentController.isNewPost()).toEqual(false);
	            dump('**********');
	        });
	        it('should get article to form fields if routeParams is defined', function () {
	            dump("Get an article from server");
	            httpBackend.flush();
	            expect($componentController.article.author).toEqual(data.author);
	            dump('The article has just gotten');
	            dump('**********');
	        });

	        it('should put a form data to the server', function () {
	            dump('Testing a button submit click');
	            $componentController.submit(data);
	            httpBackend.expectPUT('/articles_data/1').respond(data);
	            var respond = $componentController.articleInstance;
	            httpBackend.flush();
	            expect(respond.id).toEqual(data.id);
	            dump('Posting and putting are OK');
	            dump('**********');
	        });

	        it('should open modal window and delete an article', function () {
	            expect($componentController.idToDelete).toBeUndefined();
	            $componentController.delete('sm');
	            dump('Open a modal');
	            $componentController.modalInstance.close('1');
	            dump('Modal is closed');
	            dump('Articles ID to delete', $componentController.idToDelete);
	            dump('**********');
	            httpBackend.expectDELETE('/articles_data/1').respond($componentController.idToDelete);
	            var delRespond = $componentController.articleInstance;
	            httpBackend.flush();
	            dump('Response is: ', delRespond[0]);
	            expect(delRespond[0]).toEqual($componentController.idToDelete);
	            dump('Delete successful');
	        });
	    });
	});

	/******/

/***/ }

/******/ });