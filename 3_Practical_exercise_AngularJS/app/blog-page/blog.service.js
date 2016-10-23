
'use strict';

import angular from 'angular';



angular.module('blogModule').factory('blogService', () => {
  let tagsWithoutDuplicates = articles => {
    let allTags = [];

    articles.forEach(function (item) {
      let tags = item.tags;
      if (tags) {
      tags.forEach(function (tag){
        if (allTags.indexOf(tag.trim()) === -1) {
          allTags.push(tag);
        }
      });
      }
    });

    return allTags;
  };

  return {
    tagsWithoutDuplicates: tagsWithoutDuplicates
  }
});
