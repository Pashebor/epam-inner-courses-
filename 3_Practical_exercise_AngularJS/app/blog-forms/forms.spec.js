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
                then: function (confirmCallback, cancelCallback) {
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                    return this;
                }
            },
            close: function (item) {
                this.result.confirmCallBack(item);
            },
            dismiss: function (item) {
                this.result.cancelCallback(item);
            }
        };

        beforeEach(inject(function($uibModal) {
            spyOn($uibModal, 'open').and.returnValue(fakeModal);
        }));

        var data = {"id": "1",
                "author": "E. Hyperraccoon",
                "image": "images/flowers.png",
                "header": "Blogotitle of blogopost about blogoflowers",
                "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "time": "22:58 Jan 01, 2014",
                "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]
            };

        beforeEach(inject(function(_$componentController_, $httpBackend, _$rootScope_, $routeParams, _$uibModal_) {
            routeParams = {id: '1'};
            httpBackend = $httpBackend;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $componentController = _$componentController_('formComponent', {$scope: $scope, $routeParams: routeParams, $uibModal: _$uibModal_}, null);
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

        it('should put a form data to the server', function() {
            dump('Testing a button submit click');
            $componentController.submit(data);
            httpBackend.expectPUT('/articles_data/1').respond(data);
            var respond = $componentController.articleInstance;
            httpBackend.flush();
            expect(respond.id).toEqual(data.id);
            dump('Posting and putting are OK');
            dump('**********');
        });

        it('should open modal window and delete an article', function() {
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
