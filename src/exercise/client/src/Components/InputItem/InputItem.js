import "./InputItem.css";
import { Button } from "monday-ui-react-core";
import { Add } from "monday-ui-react-core/dist/allIcons";
import { useState } from "react";

export default function InputItem({ setTasks, addNewTask }) {
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);

  const inputBar = document.getElementById("newTask");

  async function addTask(task) {
    if (task === "") {
      inputBar.setCustomValidity("You forgot to type the task!");
      inputBar.reportValidity();
      return;
    }
    setLoader(true);
    if (task) {
      try {
        await addNewTask(task, new Date());
        setTasks();
      } catch (error) {
        setLoader(false);
        inputBar.setCustomValidity(error.message);
        inputBar.reportValidity();
        return;
      }
    }
    setLoader(false);
    setInput("");
  }

  return (
    <div className="addTask">
      <input
        className="inputTask"
        type="text"
        id="newTask"
        maxLength="25"
        placeholder="Add your new task!"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            addTask(input);
          }
        }}
      />
      {loader ? <div className="loader"></div> : <></>}
      <Button
        onClick={() => {
          addTask(input);
        }}
        id="addBtn"
      >
        <Add />
      </Button>
    </div>
  );
}
