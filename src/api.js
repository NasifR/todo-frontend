import axios from "axios";

// Use environment variable for API URL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// API Calls
export const getTasks = async () => {
    try {
      const response = await API.get("/tasks");
      console.log("Tasks fetched:", response.data);  // This will log the fetched data
      return response.data;  // Ensure you're returning the correct data
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

export const createTask = async (task) => {
  try {
    const response = await API.post("/tasks", task);
    console.log("Task created:", response.data); // Log the data to verify the response
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    if (error.response) {
      console.error("Error response:", error.response);
    }
    throw error;
  }
};

export const updateTask = async (id, updatedTask) => {
  try {
    const response = await API.put(`/tasks/${id}`, updatedTask);
    console.log("Task updated:", response.data); // Log the data to verify the response
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    if (error.response) {
      console.error("Error response:", error.response);
    }
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await API.delete(`/tasks/${id}`);
    console.log("Task deleted:", response.data); // Log the data to verify the response
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    if (error.response) {
      console.error("Error response:", error.response);
    }
    throw error;
  }
};
