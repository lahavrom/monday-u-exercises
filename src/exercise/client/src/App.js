import "./App.css";
import { DialogContentContainer } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import Header from "./Components/Header/Header";
import InputItem from "./Components/InputItem/InputItem";
import BottomButtons from "./Components/BottomButtons/BottomButtons";
import { useCallback, useEffect, useState, useRef } from "react";
import TaskList from "./Components/TaskList/TaskList";
import {
  getTasks,
  deleteTask,
  changeTaskStatus,
  addTask,
} from "./service/item_client";

function App() {
  const [tasks, setTasks] = useState([]);

  async function updateTasks() {
    const newTasks = await getTasks();
    setTasks(newTasks.data);
  }

  useEffect(() => {
    updateTasks();
  }, []);

  const handleDelete = useCallback(async (taskId) => {
    setTasks(tasks.filter((task) => task.taskId !== taskId));
    await deleteTask(taskId);
  });

  const handleDeleteAll = useCallback(async () => {
    taskSections.current = [];
    setTasks([]);
    await deleteTask("all");
  });

  const taskSections = useRef([]);

  return (
    <DialogContentContainer className="container">
      <Header title="DoDo app" subTitle="The app that will help you do" />
      <InputItem updateTasks={updateTasks} addNewTask={addTask} />
      <TaskList
        tasks={tasks}
        updateTasks={updateTasks}
        deleteTask={handleDelete}
        changeTaskStatus={changeTaskStatus}
        taskSections={taskSections}
      />
      <BottomButtons
        tasks={tasks}
        taskSections={taskSections}
        setTasks={setTasks}
        deleteAll={handleDeleteAll}
      />
    </DialogContentContainer>
  );
}

export default App;
