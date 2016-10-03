'use strict';

/*Blog Component test*/

describe('component: blog.component.js', function() {

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
                    "tags": [
                        "Racoon",
                        "Racoon",
                        "Coon",
                        "Dog",
                        "Cat",
                        "Developer",
                        "Anna",
                        "Beer",
                        "Banana"
                    ]
                }
            };


            beforeEach(inject(function(_$componentController_, _BlogService_, _$rootScope_, $httpBackend) {
              httpBackend = $httpBackend;
              $rootScope = _$rootScope_;
              $scope = $rootScope.$new();
              BlogService = _BlogService_;
              $componentController = _$componentController_('blogComponent', {$scope: $scope}, BlogService, null);
            }));

            afterEach(function() {
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
