const router = require("express").Router();
const userverification = require("../middleware/authmiddleware").userverification;

// Import task controller functions
const getAllTasks = require("../Controller/taskcontroller").getAllTasks;
const createTask = require("../Controller/taskcontroller").createTask;
const getTask = require("../Controller/taskcontroller").getTask;
const updateTask = require("../Controller/taskcontroller").updateTask;
const toggleTaskStatus = require("../Controller/taskcontroller").toggleTaskStatus;
const deleteTask = require("../Controller/taskcontroller").deleteTask;

// Task routes (all protected with userverification middleware)
router.get("/", userverification, getAllTasks);
router.post("/", userverification, createTask);
router.get("/:id", userverification, getTask);
router.put("/:id", userverification, updateTask);
router.patch("/:id/status", userverification, toggleTaskStatus);
router.delete("/:id", userverification, deleteTask);

module.exports = router;
