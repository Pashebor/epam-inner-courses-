'use strict';

/*CONSTANTS*/
export const GET_ARTICLES_SUCCESS = 'requestArticles';
export const GET_SINGLE_ARTICLE_SUCCESS = 'requestSingleArticle';
export const TRIGGER_VISIBILITY_DEL_BTN = 'setDelBtnVisibility';
export const ADD_ARTICLE_SUCCESS = 'requestAddedArticle';
export const SET_NOTIFICATION_CONDITION = 'setNotifCondition';
export const EDIT_ARTICLE_SUCCESS = 'requestEditedArticle';
export const DELETE_ARTICLE_SUCCESS = 'requestDeletedArticleId';
export const FILTER_SEARCH = 'filterAction';
/*ACTIONS*/
export let requestArticles = articles => {
    return{
        type: GET_ARTICLES_SUCCESS,
        payload: articles
    }
};

export let requestDeletedArticleId = deletedArticleId => {
     return{
       type: DELETE_ARTICLE_SUCCESS,
       payload: deletedArticleId
     }
};

export let requestSingleArticle = (article, isShown, nullOrLogic) => {
    return{
        type: GET_SINGLE_ARTICLE_SUCCESS,
        payload: article,
        show: isShown,
        condition: nullOrLogic
    }
};

export let setDelBtnVisibility = (logicValue) => {
    return {
        type: TRIGGER_VISIBILITY_DEL_BTN,
        show: logicValue
    }
};

export let requestAddedArticle = addedArticle => {
     return {
        type: ADD_ARTICLE_SUCCESS,
        payload: addedArticle
     }
};

export let requestEditedArticle = editedArticle => {
     return {
        type: EDIT_ARTICLE_SUCCESS,
        payload: editedArticle
     }
};

export let setNotifCondition = (logicValue) => {
  if (logicValue === null || (!!logicValue)) {
     return {
         type: SET_NOTIFICATION_CONDITION,
         condition: logicValue
     }
   } else if (logicValue === undefined || logicValue === ''){
     return false;
   }
};

/*ASYNC ACTIONS*/

export let getArticles = () => {
    return dispatch => {
        $.ajax({url: '/articles_data', dataType: 'json', type: 'GET', async: true})
            .done(response => {
            dispatch(requestArticles(response));
        });
    }
};

export let getSingleArticle = (id) => {
    return dispatch => {
        $.ajax({url: '/articles_data/' + id, dataType: 'json', type: 'GET', async: true})
        .done(response => {
            dispatch(requestSingleArticle(response, true, null));
        });
    }
};

export let addArticle = formData => {
    return dispatch => {
      $.ajax({url: '/articles_data', data: formData, type: 'POST', dataType: 'json', async: true})
      .done(response => {
           dispatch(requestAddedArticle(response));
           dispatch(setNotifCondition(true));
      }).fail (() => {
           dispatch(setNotifCondition(false));
      });

    }
};

export let editArticle = (formData, id) => {
     return dispatch => {
       $.ajax({url: '/articles_data/' + id, type: 'PUT', data: formData, dataType: 'json', async:true}).done(resp => {
           dispatch(requestEditedArticle(resp));
           dispatch(setNotifCondition(true))
         }).fail (() => {
           dispatch(setNotifCondition(false));
         });
     }
};

export const deleteArticle = id => {
     return dispatch => {
       $.ajax({url: '/articles_data/' + id, type: 'DELETE', dataType: 'json', async:true}).done(response => {
           dispatch(requestDeletedArticleId(response));
         }).fail (response => {
           console.log('Error!');
         });
     }
};

export const filterAction = filter_value => {
  return{
    type: FILTER_SEARCH,
    filterValue: filter_value
  }
};
