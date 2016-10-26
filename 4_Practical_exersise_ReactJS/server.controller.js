'use strict';
let addDateAndTags = (recevedArticle) => {
    recevedArticle.tags = recevedArticle.tags.split(",");
    recevedArticle.time = new Date();
};

module.exports = {
 deleteArticle: (id, articles) => {
   articles.forEach(function(item, i) {
          if (item.id === id) {
              var index = articles.indexOf(item);
              articles.splice(index, 1);
          }
   });
   return id;
},
editArticle: (editedArticle, id, articles) => {
    addDateAndTags(editedArticle);
    articles.some( item => {
        if(item.id === id){
            editedArticle.id = id;
            Object.assign(item, {}, editedArticle);
        }
    });
    return editedArticle;
},

createArticle: (createdArticle, articles) => {
    addDateAndTags(createdArticle);
    let ids = [], largestDigitID;

    articles.forEach( item => {
      ids.push(item.id)});
    if (ids.length === 0) {
        ids[0] = 0;
    }

    largestDigitID = Math.max.apply(Math, ids);
    createdArticle.id = "" + (largestDigitID + 1);
    articles.push(createdArticle);
    return createdArticle;
},
getSingleArticle: (id, articles) => {
  return articles.find( item => {
      return item.id === id;
    });
}

};
