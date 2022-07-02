import "./App.css";
import { DialogContentContainer } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import Header from "./Components/Header/Header";
import InputItem from "./Components/InputItem/InputItem";
import BottomButtons from "./Components/BottomButtons/BottomButtons";
import { useCallback, useEffect, useState } from "react";
import TaskList from "./Components/TaskList/TaskList";
import {
  getTasks,
  deleteTask,
  changeTaskStatus,
  addTask,
} from "./service/item_client";

function App() {
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const newTasks = await getTasks();
    setTasks(newTasks.data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = useCallback(async (taskId) => {
    setTasks(tasks.filter((task) => task.taskId !== taskId));
    await deleteTask(taskId);
  });

  const handleDeleteAll = useCallback(async () => {
    setTasks([]);
    await deleteTask("all");
  });

  return (
    <DialogContentContainer className="container">
      <Header title="DoDo app" subTitle="The app that will help you do" />
      <InputItem setTasks={fetchTasks} addNewTask={addTask} />
      <hr></hr>
      <TaskList
        tasks={tasks}
        setTasks={fetchTasks}
        deleteTask={handleDelete}
        changeTaskStatus={changeTaskStatus}
      />
      <BottomButtons deleteAll={handleDeleteAll} />
    </DialogContentContainer>
  );
}

export default App;
