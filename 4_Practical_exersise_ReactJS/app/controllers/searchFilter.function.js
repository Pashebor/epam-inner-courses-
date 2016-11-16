export const filterSearch = (state, filterState )=> {

    let filteredState = state.filter( article => {
        return (article.author.toLowerCase().indexOf(filterState.toLowerCase()) !== -1) ||
               (article.id.indexOf(filterState) !== -1 ) ||
               (article.text.toLowerCase().indexOf(filterState.toLowerCase()) !== -1) ||
               (article.tags.join(',').toLowerCase().indexOf(filterState.toLowerCase()) !== -1) ||
               (article.header.toLowerCase().indexOf(filterState.toLowerCase()) !== -1);
    });
    return filteredState.reverse();
};
