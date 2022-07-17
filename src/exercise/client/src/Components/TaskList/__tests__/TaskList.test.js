import { render, screen } from "@testing-library/react";
import TaskList from "../TaskList";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

const tasks = [
  {
    id: 56,
    ItemName: "Take dog out for a walk",
    date: new Date(),
    status: false,
  },
  {
    id: 32,
    ItemName: "Do the dishes",
    date: new Date(),
    status: true,
  },
];

describe("TaskList", () => {
  test("should render both tasks (one done and one not)", () => {
    render(
      <Provider store={store}>
        <TaskList
          tasks={tasks}
          filterTasks={[]}
          searchFilter={""}
          taskSections={{ current: [] }}
          getTasksAction={jest.fn(() => tasks)}
        />
      </Provider>
    );

    expect(screen.getByText("Take dog out for a walk")).toBeInTheDocument();
    expect(screen.getByText("Do the dishes")).toBeInTheDocument();
  });
});
