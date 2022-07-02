import "./TaskList.css";
import Task from "../Task/Task";
import PropTypes from "prop-types";

export default function TaskList({
  tasks,
  setTasks,
  deleteTask,
  changeTaskStatus,
}) {
  return (
    <div>
      {tasks.map(({ taskId, task, date, status }) => {
        return (
          <Task
            taskId={taskId}
            task={task}
            date={date}
            status={status}
            key={taskId}
            setTasks={setTasks}
            deleteTask={deleteTask}
            changeTaskStatus={changeTaskStatus}
          />
        );
      })}
    </div>
  );
}

Task.propTypes = {
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
  deleteTask: PropTypes.func,
  changeTaskStatus: PropTypes.func,
};
