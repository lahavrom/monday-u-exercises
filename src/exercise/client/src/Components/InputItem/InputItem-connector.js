import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { getTaskList } from "../../redux/selectors/taskListSelectors";
import { addTaskAction } from "../../redux/actions/taskActions";
import InputItem from "./InputItem";

function mapStateToProps(state) {
  const tasks = getTaskList(state);
  return { tasks };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addTaskAction,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InputItem);
