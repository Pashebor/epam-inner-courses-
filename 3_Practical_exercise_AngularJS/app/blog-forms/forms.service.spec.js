'use strict';

/*Forms test*/

describe('Form Service', function () {

      beforeEach(angular.mock.module("formsModule"));

      var httpBackend, formsService;
      var putData = {
        data: {"id": "1",
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

      beforeEach(inject(function($httpBackend, _formsService_) {
          httpBackend = $httpBackend;
          formsService = _formsService_;
      }));

      afterEach(function() {
          httpBackend.verifyNoOutstandingExpectation();
          httpBackend.verifyNoOutstandingRequest();
      });

      it('REST for forms', function () {
        //dump(formsService.articlesData.update({putData}));
        httpBackend.expectPUT('/articles_data?data=1').respond('1');
        var response = formsService.articlesData.update({data: '1'});
        expect(response.data).toEqual('1');
        dump(response.data);
        httpBackend.flush();

      });
});


/******/
