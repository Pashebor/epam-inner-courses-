(function () {
    'use strict';
    angular.module('racoonBlog').controller('BlogController', blogController);

    function blogController($scope){

        var i, j;

        function removeArrayDuplicates (array) {
            return  array.filter(function (element, position){
                return array.indexOf(element) === position;
            });
        }

        function compareTagsFromJSON(object) {
            var array = [];
            for (i = 0; i < object.length; i++) {
                for(j = 0; j < object[i].tags.length; j++) {
                    array.push(object[i].tags[j]);
                }
            }
            return array;
        }

        $scope.blog = articles;

        $scope.alltags = removeArrayDuplicates(compareTagsFromJSON($scope.blog));

    }

    var articles = [
        {
            id: 1,
            author: "E. Hyperraccoon",
            image: "app/assets/img/flowers.png",
            header: "Blogotitle of blogopost about blogoflowers",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            time: "22:58 Jan 01, 2014",
            tags: ['Racoon', 'Racoon', 'Coon', 'Dog', 'Cat', 'Developer', 'Anna', 'Beer', 'Banana']
        },
        {
            id: 2,
            author: "E. Hyperraccoon",
            image: "app/assets/img/paint.png",
            header: "Blogotitle of blogopost about blogoflowers",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            time: "28:67 Jan 01, 2014",
            tags: ['Racoon', 'Racoon', 'Coon', 'Dog', 'Cat', 'Duck', 'Developer', 'Car', 'Jeep']
        }
    ]

})();