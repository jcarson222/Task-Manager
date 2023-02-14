const Task = require("../models/Task");

const { request } = require("express");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}); // find({}) --> gets all tasks
    res.status(200).json({ tasks }); // {tasks} = {tasks: tasks}
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID }); // .findOne({...}) --> gets single task based on filter
    // ^^^ '_id' is the name of the automatically generated id of the task created.
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
    // or: res.status(200).send()
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true, // will return the new item
      runValidators: true, // runs validators from TaskSchema
    }); // ({id of object to update}, updating body, {options})

    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
