'use strict';

import angular from 'angular';

angular.module('formsModule').factory('FormService', () => {

  let addTagAndTime = (id, formData) => {

    let dateOfArticle = `${new Date().toLocaleString("en-US", {minute: 'numeric',hour: 'numeric',hour12: false})} ${new Date().toLocaleString("en-US", {year: 'numeric',month: 'short',day: 'numeric'})}`;
    let stringTagsBuffer;

    if (id) {
      formData.id = id;
    }
    stringTagsBuffer = formData.tags;
    formData.tags = stringTagsBuffer.trim().split(",");
    formData.time = dateOfArticle;
  };

  return {
    addTagAndTime: addTagAndTime
  }

});
