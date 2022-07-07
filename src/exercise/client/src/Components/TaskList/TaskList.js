import "./TaskList.css";
import Task from "../Task/Task";
import PropTypes from "prop-types";

export default function TaskList({
  tasks,
  updateTasks,
  deleteTask,
  changeTaskStatus,
  taskSections,
}) {
  return (
    <div>
      {tasks.map(({ taskId, task, date, status }, i) => {
        return (
          <Task
            taskId={taskId}
            task={task}
            date={date}
            status={status}
            refer={(el) => (taskSections.current[i] = el)}
            key={taskId}
            updateTasks={updateTasks}
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
  updateTasks: PropTypes.func,
  deleteTask: PropTypes.func,
  changeTaskStatus: PropTypes.func,
};
