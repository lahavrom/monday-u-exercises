import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { getTaskList } from "../../redux/selectors/taskListSelectors";
import {
  deleteTaskAction,
  setTasksAction,
} from "../../redux/actions/taskActions";
import BottomButtons from "./BottomButtons";

function mapStateToProps(state) {
  const tasks = getTaskList(state);
  return { tasks };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setTasksAction,
      deleteTaskAction,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomButtons);
