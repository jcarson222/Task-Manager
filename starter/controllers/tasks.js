const { request } = require("express");

const getAllTasks = (req, res) => {
  res.send("get all tasks");
};

const createTask = (req, res) => {
  res.json(req.body);
};

const getTask = (req, res) => {
  res.json({ id: req.params.id });
  // ^^^ don't over-think this. We want the object of a key/value pair
};

const updateTask = (req, res) => {
  res.json({ id: req.params.id });
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
