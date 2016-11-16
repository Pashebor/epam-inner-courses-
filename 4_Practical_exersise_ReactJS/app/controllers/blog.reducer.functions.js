export const editedState = (state, action) => {
    return state.map(item => {
        if(item.id == action.id) {
            return action;
        } else {
            return item;
        }
    });
};

export const deletedState = (state, action) => {
  return state.filter(item => item.id != action);
};

export const addedArticle = (state, action) => {
    let arr = [];
    arr = state.slice();
    arr.reverse()
    return state;
};
