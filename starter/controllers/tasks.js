const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({}); // find({}) --> gets all tasks

  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);

  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID }); // .findOne({...}) --> gets single task based on filter
  // ^^^ '_id' is the name of the automatically generated id of the task created.
  if (!task) {
    return res.status(404).json({ msg: `No task with id ${taskID}` });
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task with id ${taskID}` });
  }
  res.status(200).json({ task });
  // or: res.status(200).send()
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true, // will return the new item
    runValidators: true, // runs validators from TaskSchema
  }); // ({id of object to update}, updating body, {options})

  if (!task) {
    return res.status(404).json({ msg: `No task with id ${taskID}` });
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
