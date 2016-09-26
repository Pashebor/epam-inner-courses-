'use strict';

/*Blog Component test*/

describe('component: blog.component.js', function() {

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


            beforeEach(inject(function(_$componentController_, _blogService_, _$rootScope_) {
              $rootScope = _$rootScope_;
              $scope = $rootScope.$new();
              blogService = _blogService_;
              $componentController = _$componentController_('blogComponent', {$scope: $scope}, blogService, null);
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
