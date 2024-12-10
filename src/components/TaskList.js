import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import ApiLinks from "./ApiLinks";
import "./TaskList.css";  // Import the CSS file

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const fetchTasks = async () => {
    const { data } = await getTasks();
    setTasks(data);
  };

  const handleCreate = async () => {
    await createTask(newTask);
    setNewTask({ title: "", description: "" });
    fetchTasks();
  };

  const handleUpdate = async (id) => {
    await updateTask(id, { completed: true });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-list-container">
      <ApiLinks />
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <textarea
        placeholder="Task Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      ></textarea>
      <button onClick={handleCreate}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <div style={{ flexGrow: 1 }}>
              <h3 className={task.completed ? "completed" : ""}>
                {task.title}
              </h3>
              <p>{task.description}</p>
            </div>
            {task.completed && (
              <span className="checkmark">✔</span>
            )}
            <div>
              <button
                className="complete"
                onClick={() => handleUpdate(task._id)}
                disabled={task.completed} // Disable if already completed
              >
                Mark Complete
              </button>
              <button
                className="delete"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
