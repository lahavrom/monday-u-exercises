import axios from "axios";

const API_BASE = "http://localhost:8080/task";

export async function getTasks() {
  try {
    const tasks = await axios.get(API_BASE);
    return tasks;
  } catch (error) {
    alert("Something went wrong, please try again later");
  }
}

export async function addTask(task, date) {
  const data = {
    task: task,
    date: date,
  };
  const headers = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(API_BASE, data, { headers });
    return response;
  } catch (error) {
    throw new Error(error.response.data);
  }
}

export async function deleteTask(taskId) {
  try {
    await axios.delete(API_BASE, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        taskId: taskId,
      },
    });
  } catch (error) {
    alert("Something went wrong, please try again later");
  }
}

export async function changeTaskStatus(taskId, status) {
  try {
    await axios.post(
      `${API_BASE}/status`,
      {
        taskId: taskId,
        status: status,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    throw new Error();
  }
}
