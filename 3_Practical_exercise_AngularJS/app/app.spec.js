/*App controller testing*/

describe('test main controller', function() {
    beforeEach(angular.mock.module('racoonBlog'));


    var $controller;

    beforeEach(inject(function(_$controller_){

        $controller = _$controller_;
    }));


    describe('shared data in it', function() {
        it('should expose all functions', function() {
            var controller = $controller('AppController');
            dump(controller);
            expect(controller).toBeDefined();
        });
        it('result of sum func', function() {
            var controller = $controller('AppController');
            dump(controller.sum());
            expect(controller.sum()).toEqual(5);
        });
    });


});

/********/

/*Start page component testing*/

describe('component: start_blog.component.js', function() {

    beforeEach(angular.mock.module('startBlogModule'));


    describe('StartPageController', function () {

        var ctrl;

        beforeEach(inject(function($componentController) {
            var bindings = {articles: '='};
            ctrl = $componentController('startBlog', null, bindings);
        }));

        it('should expose a controller with his properties', function() {
            dump(ctrl);
            expect(ctrl.blog).toBe();
            expect(ctrl.tags).toBe();
            expect(ctrl.changeInputWithTag).toBeDefined();
        });


    });

});

/********/

/*Edit Article page component testing*/

describe('component: edit_article.component.js', function() {



    beforeEach(angular.mock.module('editArticleModule'));


    describe('EditArticleController', function () {

        var ctrl;

        beforeEach(inject(function($componentController) {

            var  blogArticleService;

            var bindings = {articles: '='};
            ctrl = $componentController('editArticle', {blogArticleService}, bindings);
        }));

        it('should expose a controller with his properties', function() {
            dump(ctrl);
            /*expect($scope.id).toBe('PG_FIRST');*/

        });


    });

});

/********/