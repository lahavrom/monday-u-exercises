const getTasksState = (state) => state.tasksReducer;

export const getTaskList = (state) => {
  return getTasksState(state).taskList;
};
