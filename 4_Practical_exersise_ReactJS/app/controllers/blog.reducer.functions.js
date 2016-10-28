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
  return state.filter(item => {
      return item.id != action;
  });
};