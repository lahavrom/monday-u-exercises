const initialState = {
  taskList: [],
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_TASKS":
      return { taskList: action.tasks };
    default:
      return state;
  }
}
