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
            spyOn($componentController, 'changeInputWithTag').and.callThrough();
          }));

        it('should take bindings', function () {
            dump('Test bindings');
            dump('Bindings: ',bindings.tag);
            expect($componentController.tag).toBeDefined();
            expect($componentController.tag).toEqual(["Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]);
            dump('**********');
        });

          it('should accept a click event  from Tag component', function () {
              dump('A Tag click event');
              dump('Clicked tag is: ',$componentController.changeInputWithTag($componentController.tag[1]));
              $componentController.changeInputWithTag($componentController.tag[0]);
              expect($componentController.changeInputWithTag($componentController.tag[0])).toEqual($componentController.tag[0]);
              dump('**********');
          });
        });
});

