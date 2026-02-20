import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    status: "Pending",
    dueDate: "",
    department: "Telesales",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing tasks from localStorage
    const existingTasks = JSON.parse(localStorage.getItem("followUps")) || [];

    // Add the new task
    const updatedTasks = [...existingTasks, { ...formData, id: Date.now().toString() }];

    // Save to localStorage
    localStorage.setItem("followUps", JSON.stringify(updatedTasks));

    // Show success alert
    alert("Task added successfully!");

    // Clear form
    setFormData({ title: "", status: "Pending", dueDate: "", department: "Telesales" });

    // Optional: If `addTask` function is needed
    if (addTask) {
      addTask(formData);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-15">
      <h2 className="text-xl font-bold mb-4">Create Task</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="Pending">Pending</option>
          <option value="Progress">Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label className="block mb-2">Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Department:</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="Telesales">Telesales</option>
          <option value="Academics">Academics</option>
          <option value="Accounts">Accounts</option>
          <option value="Placements">Placements</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-[#002147]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
