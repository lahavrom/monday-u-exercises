import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { getTaskList } from "../../redux/selectors/taskListSelectors";
import { getFilterTasksList } from "../../redux/selectors/filterTasksSelector";
import {
  getTasksAction,
  deleteTaskAction,
  changeTaskStatusAction,
} from "../../redux/actions/taskActions";
import TaskList from "./TaskList";

function mapStateToProps(state) {
  const tasks = getTaskList(state);
  const filterTasks = getFilterTasksList(state);
  return { tasks, filterTasks };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTasksAction,
      deleteTaskAction,
      changeTaskStatusAction,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
