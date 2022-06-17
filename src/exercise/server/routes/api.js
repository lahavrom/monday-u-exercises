// Define your endpoints here (this is your "controller file")
const express = require('express');
const { getTasks, addTask, deleteTask } = require('../services/itemController');

const taskRouter = express.Router();

taskRouter.get('/', getTasks);
taskRouter.post('/', addTask);
taskRouter.delete('/', deleteTask);

module.exports = taskRouter;