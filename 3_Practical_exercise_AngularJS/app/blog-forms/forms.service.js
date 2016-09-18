angular.module('createArticleModule').service('FormService', remakeDataArticle);


function remakeDataArticle() {
    let article;
    let editedArticle;
    let delArticle;

    const addArticle = objArt => {
        article = objArt;
    };
    const addEditedArticle = objEdited => {
        editedArticle = objEdited
    };
    const addDelArticle = objDel => {
      delArticle = objDel;
    };
    const getArticleList = () => {
        return article;
    };
    const getEditedArticle = () => {
        return editedArticle;
    };
    const getDelArticle = () => {
      return delArticle;
    };

    return {
        addArticle: addArticle,
        getArticleList: getArticleList,
        addEditedArticle: addEditedArticle,
        getEditedArticle: getEditedArticle,
        addDelArticle: addDelArticle,
        getDelArticle: getDelArticle
    }
}
