// The ItemManager should go here. Remember that you have to export it.

const ItemManager = require('./ItemManager');

const itemManager = new ItemManager;

async function getTasks(req, res) {
    let data = await itemManager.getTasks();
    if (!data) {
        data = [];
    }
    res.status(200).json(data);
}

async function addTask(req, res) {
    if (!req.body.task || !req.body.date) {
        const error = new Error("wrong parameters");
        error.statusCode = 400;
        throw error;
    }
    try{
        await itemManager.addTask(req.body);
    } catch(error) {
        // throw error;
        return res.status(400).json(error.message);
    }
    res.status(200).json(req.body);
}

async function deleteTask(req, res) {
    if (!req.body.task || !req.body.date) {
        const error = new Error("wrong parameters");
        error.statusCode = 400;
        throw error;
    }
    await itemManager.deleteTask(req.body);
    res.status(200).json(req.body);
}

module.exports = { getTasks, addTask, deleteTask }