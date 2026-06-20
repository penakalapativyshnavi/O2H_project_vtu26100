const express = require("express");

const {
  getTasks,
  addTask,
  completeTask,
  deleteTask
} = require("../controllers/taskController");

const router = express.Router();

router.get("/tasks", getTasks);

router.post("/tasks", addTask);

router.put("/tasks/:id", completeTask);

router.delete("/tasks/:id", deleteTask);

module.exports = router;