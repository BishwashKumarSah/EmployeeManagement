import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddForm.css";

const AddEmployeeForm = ({ onClose, onAddEmployee, onUpdateEmployee, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    salary: "",
    date: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (initialData) {
        // Update existing employee
        response = await axios.put(
          `http://localhost:8000/api/employee/${formData._id}`,
          formData
        );
        if (onUpdateEmployee) {
          onUpdateEmployee(response.data.data);
        }
      } else {
        // Add new employee
        response = await axios.post(
          "http://localhost:8000/api/employee",
          formData
        );
        if (onAddEmployee) {
          onAddEmployee(response.data.data); // Pass new employee data to parent
        }
      }
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        salary: "",
        date: "",
      });
      onClose();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  return (
    <div className="blur-overlay">
      <div className="form-container">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="form-heading">
          {initialData ? "Edit Employee" : "Add Employee"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary:</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {initialData ? "Update Employee" : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
