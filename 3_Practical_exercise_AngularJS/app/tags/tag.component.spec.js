'use strict';

/*Tag Component test*/

describe('component: tag.component.js', function() {


        beforeEach(angular.mock.module('tagModule'));


        describe('Tag Controller', function () {

          var $componentController , scope;
          var bindings = {tag: ["Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]};

          beforeEach(inject(function(_$componentController_, $rootScope) {
            scope = $rootScope.$new();
            $componentController = _$componentController_('tagComponent', {$scope: scope}, bindings);
          }));

          it('should take bindings', function () {
            dump($componentController);
            expect($componentController.tag).toBeDefined();
            expect($componentController.tag).toEqual(["Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]);
          });

          it('should accept an event click from Tag component', function () {
              var tag  = 'Racoon';
              expect($componentController.changeInputWithTag(tag)).toEqual(tag);
          });
        });
});

/********/
