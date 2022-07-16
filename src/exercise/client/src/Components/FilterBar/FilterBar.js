import "./FilterBar.css";
import { Dropdown, Search } from "monday-ui-react-core";
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { getTaskList } from "../../redux/selectors/taskListSelectors";
import { updateFilterTasksAction } from "../../redux/actions/filterTasksActions";
import { setTasksAction } from "../../redux/actions/taskActions";

function SearchBar({
  tasks,
  setTasksAction,
  updateFilterTasksAction,
  setSearchFilter,
}) {
  const [clicked, setClicked] = useState(false);

  function handleFilter(value) {
    if (value) {
      let tmp = [...tasks];
      switch (value.label) {
        case "All":
          updateFilterTasksAction(tmp);
          setTasksAction(tasks);
          return;
        case "To Do":
          tmp = tmp.filter((task) => task.status === false);
          updateFilterTasksAction(tmp);
          setTasksAction(tasks);
          return;
        case "Completed":
          tmp = tmp.filter((task) => task.status === true);
          updateFilterTasksAction(tmp);
          setTasksAction(tasks);
          return;
        default:
          return;
      }
    }
  }

  return (
    <div className="filterBar">
      <Search
        placeholder="Search Task"
        onFocus={() => setClicked(true)}
        onBlur={() => setClicked(false)}
        wrapperClassName={clicked ? "searchBarClicked" : "searchBar"}
        size={Search.sizes.SMALL}
        onChange={(value) => setSearchFilter(value)}
      />
      <Dropdown
        className="choiceFilter"
        size={Dropdown.size.SMALL}
        onChange={(value) => handleFilter(value)}
        options={[
          {
            label: "All",
            value: 1,
          },
          {
            label: "To Do",
            value: 2,
          },
          {
            label: "Completed",
            value: 3,
          },
        ]}
        placeholder="Filter Tasks"
      />
    </div>
  );
}

function mapStateToProps(state) {
  const tasks = getTaskList(state);
  return { tasks };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateFilterTasksAction,
      setTasksAction,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
