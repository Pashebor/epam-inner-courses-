'use strict';

import angular from 'angular';
import 'angular-resource';

angular.module('formsModule').factory('formsService', formService);

function formService ($resource) {

    let articlesData = () => {
        return $resource('/articles_data', { data: '@data' }, {
            update: {
                method: 'PUT'
            }
        });
    };

    let createArticle = () => $resource('/articles_data');

    let article = () => $resource('/articles_data/:id');




    return{
        articlesData: articlesData(),
        createArticle: createArticle(),
        article: article()

    }

}