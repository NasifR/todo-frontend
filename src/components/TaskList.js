import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import ApiLinks from "./ApiLinks";
import "./TaskList.css";  // Import the CSS file

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const fetchTasks = async () => {
    try {
      const tasks = await getTasks();
      console.log("Tasks data received:", tasks);  // Add this line to check the data
      if (Array.isArray(tasks)) {
        setTasks(tasks);
      } else {
        console.error("Invalid tasks data:", tasks);  // This will show what was returned
        setTasks([]);  // Set to empty array if data is invalid
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);  // Set to empty array in case of error
    }
  };
  

  const handleCreate = async () => {
    if (!newTask.title.trim() || !newTask.description.trim()) {
      alert("Please enter both title and description.");
      return;
    }
    try {
      await createTask(newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateTask(id, { completed: true });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
        {Array.isArray(tasks) && tasks.map((task) => (
          <li key={task._id}>
            <div style={{ flexGrow: 1 }}>
              <h3 className={task.completed ? "completed" : ""}>
                {task.title}
              </h3>
              <p>{task.description}</p>
            </div>
            {task.completed && <span className="checkmark">✔</span>}
            <div>
              {!task.completed && (
                <button
                  className="complete"
                  onClick={() => handleUpdate(task._id)}
                >
                  Mark Complete
                </button>
              )}
              <button className="delete" onClick={() => handleDelete(task._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
console.log("API URL:", process.env.REACT_APP_API_URL);


export default TaskList;
