import "./Task.css";
import { Checkbox, Button } from "monday-ui-react-core";
import { Delete } from "monday-ui-react-core/dist/allIcons";
import { useState } from "react";
import PropTypes from "prop-types";

function taskDate(dateString) {
  let date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function taskTime(dateString) {
  let date = new Date(dateString);
  let minutes = String(date.getMinutes());
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  return `${date.getHours()}:${minutes}`;
}

export default function Task({
  taskId,
  task,
  date,
  status,
  refer,
  updateTasks,
  deleteTask,
  changeTaskStatus,
}) {
  const [showTask, setShowTask] = useState(true);

  async function handleDelete() {
    setShowTask(false);
    setTimeout(() => {
      deleteTask(taskId);
    }, 800);
  }

  async function handleChangeStatus() {
    const change = !status;
    try {
      await changeTaskStatus(taskId, change);
      updateTasks();
    } catch (error) {
      alert("Something went wrong, try again later");
    }
  }

  return (
    <div
      className={showTask ? "taskSection" : "taskSection removed"}
      id={taskId}
      ref={refer}
    >
      <div className="task">
        <Checkbox
          onChange={handleChangeStatus}
          className="checkBox"
          defaultChecked={status}
        />
        <p>{task}</p>
        <p className="time" id={date}>
          {taskDate(date)}
          <br />
          {taskTime(date)}
        </p>
      </div>
      <Button
        leftIcon={Delete}
        className="deleteBtn"
        color={Button.colors.NEGATIVE}
        onClick={handleDelete}
      />
    </div>
  );
}

Task.propTypes = {
  taskId: PropTypes.number,
  task: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.bool,
  updateTasks: PropTypes.func,
  deleteTask: PropTypes.func,
  changeTaskStatus: PropTypes.func,
};
