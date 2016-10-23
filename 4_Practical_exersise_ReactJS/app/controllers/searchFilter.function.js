export const filterSearch = state => {

    let filteredState = state.blogState.filter( article => {
        return (article.author.toLowerCase().indexOf(state.filterState.toLowerCase()) !== -1) ||
            (article.id.indexOf(state.filterState) !== -1 ) ||
            (article.text.toLowerCase().indexOf(state.filterState.toLowerCase()) !== -1) ||
            (article.tags.join(',').toLowerCase().indexOf(state.filterState.toLowerCase()) !== -1) ||
            (article.header.toLowerCase().indexOf(state.filterState.toLowerCase()) !== -1);
    });
    return filteredState;
};