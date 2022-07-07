const ItemManager = require("./ItemManager");

const itemManager = new ItemManager();

async function getTasks(req, res) {
  try {
    let data = await itemManager.getTasks();
    if (!data) {
      data = [];
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode).json(error.message);
  }
}

async function addTask(req, res) {
  const { task, date } = req.body;
  if (!task || !date) {
    const error = new Error("wrong parameters");
    error.statusCode = 400;
    throw error;
  }
  try {
    await itemManager.addTask(task, date);
  } catch (error) {
    return res.status(400).json(error.message);
  }
  res.status(200).json(req.body);
}

async function deleteTask(req, res) {
  const { taskId } = req.body;
  if (!taskId) {
    const error = new Error("wrong parameters");
    error.statusCode = 400;
    throw error;
  }
  if (taskId === "all") {
    try {
      await itemManager.deleteAll();
      res.status(200).json(taskId);
      return;
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  try {
    await itemManager.deleteTask(taskId);
  } catch (error) {
    res.status(500).json(error.message);
  }
  res.status(200).json(taskId);
}

async function changeTaskStatus(req, res) {
  const { taskId, status } = req.body;
  if (!taskId) {
    const error = new Error("wrong parameters");
    error.statusCode = 400;
    throw error;
  }
  try {
    await itemManager.changeTaskStatus(taskId, status);
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  changeTaskStatus,
};
