import "./TaskList.css";
import Task from "../Task/Task";
import PropTypes from "prop-types";
import { useEffect, useCallback } from "react";
import { toast } from "react-toastify";

export default function TaskList({
  tasks,
  filterTasks,
  searchFilter,
  taskSections,
  getTasksAction,
  deleteTaskAction,
  changeTaskStatusAction,
}) {
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = useCallback(async () => {
    await getTasksAction();
  }, [getTasksAction]);

  const deleteTask = useCallback(
    async (taskId) => {
      try {
        await deleteTaskAction(taskId);
      } catch (err) {
        toast.error(err.message);
      }
    },
    [deleteTaskAction]
  );

  const changeTaskStatus = useCallback(
    async (taskId, status) => {
      try {
        await changeTaskStatusAction(taskId, status);
      } catch (err) {
        toast.error(err.message);
      }
    },
    [changeTaskStatusAction]
  );

  const tasksToRender = filterTasks.length === 0 ? tasks : filterTasks;

  return (
    <div>
      {tasksToRender
        .filter((task) => task.ItemName.includes(searchFilter))
        .map(({ id, ItemName, date, status }, i) => {
          return (
            <Task
              taskId={id}
              task={ItemName}
              date={date}
              status={status}
              refer={(el) => (taskSections.current[i] = el)}
              key={id}
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
  searchFilter: PropTypes.string,
  taskSections: PropTypes.array,
  getTasksAction: PropTypes.func,
  deleteTaskAction: PropTypes.func,
  changeTaskStatusAction: PropTypes.func,
};
