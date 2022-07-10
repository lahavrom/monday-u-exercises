import "./App.css";
import { DialogContentContainer } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import Header from "./Components/Header/Header";
import InputItem from "./Components/InputItem/InputItem-connector";
import BottomButtons from "./Components/BottomButtons/BottomButtons-connector";
import TaskList from "./Components/TaskList/TaskList-connector";
import { useState, useRef } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "./Components/FilterBar/FilterBar";

function App() {
  const taskSections = useRef([]);
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <DialogContentContainer className="container">
      <ToastContainer
        position="top-center"
        hideProgressBar
        autoClose={2000}
        transition={Zoom}
        theme="dark"
      />
      <Header title="DoDo app" subTitle="The app that will help you do" />
      <InputItem />
      <SearchBar setSearchFilter={setSearchFilter} />
      <TaskList searchFilter={searchFilter} taskSections={taskSections} />
      <BottomButtons taskSections={taskSections} />
    </DialogContentContainer>
  );
}

export default App;
