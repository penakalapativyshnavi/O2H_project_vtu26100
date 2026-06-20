let tasks = [
  {
    id: 1,
    title: "Build Login Page",
    description: "Create responsive login page using React.",
    status: "Pending"
  }
];

const getTasks = (req, res) => {
  res.json(tasks);
};

const addTask = (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  };

  tasks.push(newTask);

  res.json({
    message: "Task Added Successfully"
  });
};

const completeTask = (req, res) => {
  const id = parseInt(req.params.id);

  tasks = tasks.map((task) =>
    task.id === id
      ? { ...task, status: "Completed" }
      : task
  );

  res.json({
    message: "Task Completed"
  });
};

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);

  tasks = tasks.filter((task) => task.id !== id);

  res.json({
    message: "Task Deleted"
  });
};

module.exports = {
  getTasks,
  addTask,
  completeTask,
  deleteTask
};