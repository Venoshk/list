const tasksModel = require('../models/tesksModel');

const getAll = async (_req, res) =>{

    const tasks = await tasksModel.getAll();          
    return res.status(200).json(tasks);
};


const createTask = async (req, res) =>{
    const creatdTask = await tasksModel.createTask(req.body);
    return res.status(201).json(creatdTask);
};

const deleteTasks = async (req, res) =>{
    const {id} =  req.params;

    await tasksModel.deleteTasks(id);
    return res.status(204).json()
};

const updateTasks = async (req, res) =>{
    const {id} =  req.params;

    await tasksModel.updateTasks(id, req.body);
    return res.status(204).json();
}
module.exports = {
    getAll,
    createTask,
    deleteTasks,
    updateTasks,
    
};