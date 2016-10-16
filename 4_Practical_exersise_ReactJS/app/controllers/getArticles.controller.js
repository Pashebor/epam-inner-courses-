
export const filteredArticles = (state, action) => {

    let duplicates = state.concat(action), i, j ;

    if (state.length === 0) {

        return state.concat(action);
    } else {

        for ( i= 0; i < duplicates.length; i = i + 1) {
            for ( j = i + 1; j < duplicates.length; j = j + 1) {
                if (duplicates[j].id === duplicates[i].id) {
                    duplicates.splice(j, 1);
                }
            }
        }
        duplicates.sort((article, nextArticle) => {
            return article.id - nextArticle.id;
        });

        return duplicates;
    }
}