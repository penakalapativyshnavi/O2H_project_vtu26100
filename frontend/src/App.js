import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTask = () => {
    if (title.trim() === "") {
      alert("Title is required");
      return;
    }

    if (description.length < 20) {
      alert("Description should contain at least 20 characters");
      return;
    }

    axios
      .post("http://localhost:5000/tasks", {
        title,
        description,
        status,
      })
      .then(() => {
        fetchTasks();
        setTitle("");
        setDescription("");
        setStatus("Pending");
      });
  };

  const updateStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:5000/tasks/${id}`, {
        status: newStatus,
      })
      .then(() => {
        fetchTasks();
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        fetchTasks();
      });
  };

  const filteredTasks = tasks.filter((task) => {
  const matchesStatus =
    filter === "All" || task.status === filter;

  const matchesSearch =
    task.title
      .toLowerCase()
      .includes(search.toLowerCase());

  return matchesStatus && matchesSearch;
});

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className={darkMode ? "App dark" : "App"}>

      <h1>📋 Mini Project Management Portal</h1>
      <button
  className="dark-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>

<br /><br />

      <div className="stats">

        <div className="stat-card">
          <h2>{totalTasks}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card">
          <h2>{pendingTasks}</h2>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h2>{inProgressTasks}</h2>
          <p>In Progress</p>
        </div>

        <div className="stat-card">
          <h2>{completedTasks}</h2>
          <p>Completed</p>
        </div>

      </div>

      <h2>Overall Progress : {progress}%</h2>
      <div className="progress-bar">
  <div
    className="progress-fill"
    style={{ width: `${progress}%` }}
  >
    {progress}%
  </div>
</div>

      <div className="form-container">

        <h2>➕ Add Task</h2>

       <input
  type="text"
  placeholder="🔍 Search by title..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button onClick={addTask}>
          Create Task
        </button>

      </div>

      <h2>Filter Tasks</h2>
      <div className="filter-section">

  <h2>Search Task</h2>

  <input
    type="text"
    placeholder="Search by title..."
  />

  <h2>Filter Tasks</h2>

  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  >
    <option>All</option>
    <option>Pending</option>
    <option>In Progress</option>
    <option>Completed</option>
  </select>

</div>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option>All</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <h2>📌 Task List</h2>

      <div className="task-list">

        {filteredTasks.map((task) => (

          <div className="task-card" key={task.id}>

            <h3>{task.title}</h3>

            <p>{task.description}</p>

           <p
  className={
    task.status === "Pending"
      ? "pending"
      : task.status === "In Progress"
      ? "inprogress"
      : "completed"
  }
>
  Status : {task.status}
</p>

            <h4>Change Status</h4>

            <select
              value={task.status}
              onChange={(e) =>
                updateStatus(task.id, e.target.value)
              }
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <br />
            <br />

            <button
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;