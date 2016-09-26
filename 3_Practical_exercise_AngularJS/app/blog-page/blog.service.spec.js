'use strict';
/*Blog Service test*/

describe('Blog Service', function() {

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

    var obj = {
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
    };
    var arrayOfObj = [obj];

    beforeEach(inject(function($httpBackend, _blogService_) {
        httpBackend = $httpBackend;
        blogService = _blogService_;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('Check GET Request', function() {

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
