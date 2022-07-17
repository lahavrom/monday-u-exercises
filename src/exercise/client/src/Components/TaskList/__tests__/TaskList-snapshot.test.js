import renderer from "react-test-renderer";
import TaskList from "../TaskList";

test("renders tasks correctly", () => {
  const tasks = [
    {
      id: 0,
      ItemName: "task 1",
      status: false,
      date: "Sat Jul 16 2022 21:02:44 GMT+0300 (Israel Daylight Time)",
    },
    {
      id: 1,
      ItemName: "task 2",
      status: true,
      date: "Sat Jul 16 2022 21:02:44 GMT+0300 (Israel Daylight Time)",
    },
    {
      id: 2,
      ItemName: "task 3",
      status: false,
      date: "Sat Jul 16 2022 21:02:44 GMT+0300 (Israel Daylight Time)",
    },
  ];
  const taskSections = { current: [] };
  const taskList = renderer
    .create(
      <TaskList
        tasks={tasks}
        taskSections={taskSections}
        filterTasks={[]}
        searchFilter={""}
      />
    )
    .toJSON();
  expect(taskList).toMatchSnapshot();
});
