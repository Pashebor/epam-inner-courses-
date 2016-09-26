
'use strict';

import angular from 'angular';

angular.module('blogModule').factory('blogService', startBlog);

function startBlog ($resource) {

    let getArticles = () => {
        return $resource('/articles_data');
    };

    let tagsWithoutDuplicates = jsonData => {
        let allTags = [];

        jsonData.forEach(function (item) {
            let tags = item.tags;
            tags.forEach(function (tag){

                if (allTags.indexOf(tag.trim()) === -1) {
                    allTags.push(tag);
                }
            });
        });

        return allTags;
    };

    return{
        getArticles: getArticles(),
        tagsWithoutDuplicates: tagsWithoutDuplicates
    }

}