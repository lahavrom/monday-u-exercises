import tasksReducer from "../tasksReducer";

test("should return the initial state", () => {
  expect(tasksReducer(undefined, { type: undefined })).toEqual({
    taskList: [],
  });
});

test("handle a task being added to an empty list", () => {
  expect(
    tasksReducer({ taskList: [] }, { type: "ADD", task: "new task" })
  ).toEqual({ taskList: ["new task"] });
});

test("handle a task being added to an existing list", () => {
  expect(
    tasksReducer({ taskList: ["old task"] }, { type: "ADD", task: "new task" })
  ).toEqual({ taskList: ["old task", "new task"] });
});

test("delete task", () => {
  const taskList = [{ id: 0 }, { id: 1 }, { id: 2 }];
  expect(tasksReducer({ taskList }, { type: "DELETE", taskId: 1 })).toEqual({
    taskList: [{ id: 0 }, { id: 2 }],
  });
});

test("delete all tasks", () => {
  const taskList = [{ id: 0 }, { id: 1 }, { id: 2 }];
  expect(tasksReducer({ taskList }, { type: "DELETE", taskId: "all" })).toEqual(
    { taskList: [] }
  );
});

test("handle change status of a task", () => {
  const taskList = [
    { id: 1, status: false },
    { id: 0, status: true },
  ];
  expect(
    tasksReducer({ taskList }, { type: "CHANGE_STATUS", taskId: 0 })
  ).toEqual({
    taskList: [
      { id: 1, status: false },
      { id: 0, status: false },
    ],
  });
});
