function update(tasks) {
  return {
    type: "UPDATE_TASKS",
    tasks,
  };
}

export function updateFilterTasksAction(tasks) {
  return async (dispatch) => {
    dispatch(update(tasks));
  };
}
