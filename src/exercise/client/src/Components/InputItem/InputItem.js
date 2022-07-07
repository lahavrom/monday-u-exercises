import "./InputItem.css";
import { Button, Loader } from "monday-ui-react-core";
import { Add } from "monday-ui-react-core/dist/allIcons";
import { useState, useRef } from "react";

export default function InputItem({ updateTasks, addNewTask }) {
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);
  const inputBar = useRef(null);

  async function addTask(task) {
    if (task === "") {
      inputBar.current.setCustomValidity("You forgot to type the task!");
      inputBar.current.reportValidity();
      return;
    }
    setLoader(true);
    if (task) {
      try {
        await addNewTask(task, new Date());
        updateTasks();
      } catch (error) {
        setLoader(false);
        inputBar.current.setCustomValidity(error.message);
        inputBar.current.reportValidity();
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
        ref={inputBar}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            addTask(input);
          }
        }}
      />
      {loader ? <Loader color={Loader.colors.PRIMARY} size={30} /> : <></>}
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
