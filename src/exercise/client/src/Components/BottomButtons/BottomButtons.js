import "./BottomButtons.css";
import { Button } from "monday-ui-react-core";
import { useState } from "react";
import { toast } from "react-toastify";

export default function BottomButtons({
  tasks,
  taskSections,
  setTasksAction,
  deleteTaskAction,
}) {
  const [ascTime, setAscTime] = useState(false);
  const [ascAZ, setAscAZ] = useState(true);

  // clear all tasks
  async function clearAll() {
    taskSections.current.forEach((elem) => {
      if (elem) {
        elem.classList.add("removed");
      }
    });
    setTimeout(async () => {
      try {
        await deleteTaskAction("all");
      } catch (err) {
        toast.error(err.message);
      }
    }, 800);
  }

  // sort tasks by name
  function sortAZ() {
    const tmp = [...tasks];
    tmp.sort((a, b) => {
      if (ascAZ) {
        return a.ItemName.localeCompare(b.ItemName);
      }
      return b.ItemName.localeCompare(a.ItemName);
    });
    setTasksAction(tmp);
  }

  // sort tasks by date they created
  function sortTime() {
    const tmp = [...tasks];
    tmp.sort((a, b) => {
      if (ascTime) {
        return new Date(a.date) - new Date(b.date);
      }
      return new Date(b.date) - new Date(a.date);
    });
    setTasksAction(tmp);
  }

  return (
    <div className="bottom">
      <Button
        onClick={() => {
          sortAZ();
          setAscAZ(!ascAZ);
        }}
        className="functionBtn"
      >
        Sort by Name
      </Button>
      <Button
        onClick={() => {
          sortTime();
          setAscTime(!ascTime);
        }}
        className="functionBtn"
      >
        Sort by Date
      </Button>
      <Button
        onClick={() => {
          clearAll();
        }}
        className="functionBtn"
      >
        Clear all
      </Button>
    </div>
  );
}
