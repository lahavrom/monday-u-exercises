const express = require('express');
const { getTasks, addTask, deleteTask, changeTaskStatus } = require('../services/itemController');

const taskRouter = express.Router();

taskRouter.get('/', getTasks);
taskRouter.post('/', addTask);
taskRouter.delete('/', deleteTask);

taskRouter.post('/status', changeTaskStatus);

module.exports = taskRouter;