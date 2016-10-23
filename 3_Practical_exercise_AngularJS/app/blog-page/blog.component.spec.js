'use strict';

/*Blog Component test*/

describe('component: blog.component.js', function() {

    beforeEach(angular.mock.module('blogModule'));


    describe('Blog Controller', function () {

        var $componentController;
        var blogService, httpBackend;
        var $scope, $rootScope;


        var data = [
            {
                "id": "1",
                "author": "E. Hyperraccoon",
                "image": "images/flowers.png",
                "header": "Blogotitle of blogopost about blogoflowers",
                "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "time": "22:58 Jan 01, 2014",
                "tags": ["Racoon", "Racoon", "Coon", "Coon", "Dog", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]
            }
        ];

        beforeEach(inject(function(_$componentController_, _blogService_, _$rootScope_, $httpBackend) {
            httpBackend = $httpBackend;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            blogService = _blogService_;
            $componentController = _$componentController_('blogComponent', {$scope: $scope}, blogService, null);
            httpBackend.whenGET('/articles').respond(data);
        }));

        afterEach(function() {
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


