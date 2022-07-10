import { combineReducers } from "redux";
import tasksReducer from "./tasksReducer";
import filterTasksReducer from "./filterTasksReducer";

const allReducers = combineReducers({
  tasksReducer,
  filterTasksReducer,
});

export default allReducers;
