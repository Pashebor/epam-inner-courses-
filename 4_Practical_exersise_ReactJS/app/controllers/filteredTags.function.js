
export const removeDuplicatedTags = (data) => {

    let allTags = [];
        data.forEach(function (item) {
          let tags = item.tags;
          tags.forEach(function (tag){
              allTags.push(tag.trim());
          });
        });

    let uniqueArray = allTags.filter((item, pos) => {
        return allTags.indexOf(item) == pos;
      });

  return uniqueArray;
};
