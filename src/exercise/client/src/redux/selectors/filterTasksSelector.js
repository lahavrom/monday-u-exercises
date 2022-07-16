const getFilterTasksState = (state) => state.filterTasksReducer;

export const getFilterTasksList = (state) => {
  return getFilterTasksState(state).taskList;
};
