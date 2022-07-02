import "./BottomButtons.css";
import { Button } from "monday-ui-react-core";
import { useState } from "react";

// sort tasks by date they created
function sortTime(ascTime) {
  const taskSections = document.body.querySelectorAll("div.taskSection");
  let tmpTaskSections = [...taskSections];
  tmpTaskSections.sort((a, b) => {
    a = a.querySelector("div.task").querySelector("p.time").id;
    b = b.querySelector("div.task").querySelector("p.time").id;
    if (ascTime) {
      return new Date(a) - new Date(b);
    }
    return new Date(b) - new Date(a);
  });
  for (let i = 0; i < tmpTaskSections.length; i++) {
    taskSections[i].parentNode.appendChild(tmpTaskSections[i]);
  }
}

// sort tasks by name
function sortAZ(ascAZ) {
  const taskSections = document.body.querySelectorAll("div.taskSection");
  let tmpTaskSections = [...taskSections];
  tmpTaskSections.sort((a, b) => {
    a = a.querySelector("div.task").querySelector("p").innerText;
    b = b.querySelector("div.task").querySelector("p").innerText;
    if (ascAZ) {
      return a.localeCompare(b);
    }
    return b.localeCompare(a);
  });
  for (let i = 0; i < tmpTaskSections.length; i++) {
    taskSections[i].parentNode.appendChild(tmpTaskSections[i]);
  }
}

export default function BottomButtons({ deleteAll }) {
  const [ascTime, setAscTime] = useState(false);
  const [ascAZ, setAscAZ] = useState(true);

  // clear all tasks
  async function clearAll() {
    const taskSections = document.body.querySelectorAll("div.taskSection");
    taskSections.forEach((elem) => {
      elem.classList.add("removed");
    });
    setTimeout(async () => {
      await deleteAll();
    }, 800);
  }

  return (
    <div className="bottom">
      <Button
        onClick={() => {
          sortAZ(ascAZ);
          setAscAZ(!ascAZ);
        }}
        className="functionBtn"
      >
        Sort by Name
      </Button>
      <Button
        onClick={() => {
          sortTime(ascTime);
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
