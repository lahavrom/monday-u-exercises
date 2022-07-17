import renderer from "react-test-renderer";
import Task from "../Task";

test("renders task correctly", () => {
  const task = renderer
    .create(
      <Task
        taskId={0}
        task={"this is a task"}
        date={"Sat Jul 16 2022 21:02:44 GMT+0300 (Israel Daylight Time)"}
        status={false}
      />
    )
    .toJSON();
  expect(task).toMatchSnapshot();
});
