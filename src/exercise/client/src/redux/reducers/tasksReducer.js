const initialState = {
  taskList: [],
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_TASKS":
      return { taskList: action.tasks };

    case "ADD":
      return { taskList: [...state.taskList, action.task] };

    case "DELETE":
      if (action.taskId === "all") {
        return { taskList: [] };
      }
      return {
        taskList: state.taskList.filter((task) => task.id !== action.taskId),
      };

    case "CHANGE_STATUS":
      const taskIndex = state.taskList.findIndex(
        (elem) => elem.id === action.taskId
      );
      state.taskList[taskIndex].status = !state.taskList[taskIndex].status;
      return { taskList: [...state.taskList] };

    case "SET_TASKS":
      return { taskList: action.tasks };

    case "ERROR":
      throw new Error(action.errorMsg);

    default:
      return state;
  }
}
