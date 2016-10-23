'use strict';
module.exports = {
 deleteArticle: (id, articles) => {
   articles.find((item, i, arr) => {
     if(item.id === id) {
       arr.splice(i, 1);
     }
   });
},
editArticle: (editedArt, id, articles) => {
    articles.some( (item, i, array) => {
        if(item.id === id){
            item.author = editedArt.author;
            item.header = editedArt.header;
            item.text = editedArt.text;
            item.tags = editedArt.tags;
            item.image = editedArt.image;
            item.time = editedArt.time;
        }
    });
},

createArticle: (createdData, articles) => {

    let ids = [], largestDigitID;

    articles.forEach( item => {
      ids.push(item.id)});
      if (ids.length === 0) {
        ids[0] = 0;
      }

      largestDigitID = Math.max.apply(Math, ids);
      createdData.id = "" + (largestDigitID + 1);
      articles.push(createdData);
},
getSingleArticle: (id, articles) => {
  return articles.find( item => {
      return item.id === id;
    });
}

}
