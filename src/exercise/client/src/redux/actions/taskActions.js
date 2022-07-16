import {
  getTasks,
  addTask,
  deleteTask,
  changeTaskStatus,
} from "../../services/item_client";

function get(tasks) {
  return {
    type: "GET_TASKS",
    tasks,
  };
}

function add(task) {
  return {
    type: "ADD",
    task: task,
  };
}

function remove(taskId) {
  return {
    type: "DELETE",
    taskId: taskId,
  };
}

function changeStatus(taskId) {
  return {
    type: "CHANGE_STATUS",
    taskId: taskId,
  };
}

function setTasks(tasks) {
  return {
    type: "SET_TASKS",
    tasks,
  };
}

function error(errorMsg) {
  return {
    type: "ERROR",
    errorMsg,
  };
}

export function getTasksAction() {
  return async (dispatch) => {
    try {
      const response = await getTasks();
      dispatch(get(response));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

export function addTaskAction(task, date) {
  return async (dispatch) => {
    try {
      const response = await addTask(task, date);
      if (!response.length) {
        dispatch(add(response));
      } else {
        response.forEach((task) => dispatch(add(task)));
      }
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

export function deleteTaskAction(taskId) {
  return async (dispatch) => {
    try {
      await deleteTask(taskId);
      dispatch(remove(taskId));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

export function changeTaskStatusAction(taskId, newStatus) {
  return async (dispatch) => {
    try {
      await changeTaskStatus(taskId, newStatus);
      dispatch(changeStatus(taskId));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

export function setTasksAction(tasks) {
  return async (dispatch) => {
    dispatch(setTasks(tasks));
  };
}
