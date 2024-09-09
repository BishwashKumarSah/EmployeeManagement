import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import "./Table.css"; // Importing the CSS file
import AddEmployeeForm from "../Form/AddForm";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/employee");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (employeeToDelete) {
        await axios.delete(
          `http://localhost:8000/api/employee/${employeeToDelete}`
        );
        setOpenConfirmDialog(false);
        // Refresh data after deletion
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleLogout = async () => {
    try {
      // Make a request to the backend to invalidate the token (optional)
      await axios.post("http://localhost:8000/api/auth/logout"); // Adjust the URL as needed

      // Remove token from localStorage
      localStorage.removeItem("token");

      // Update authentication context
      logout();

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const handleAddEmployee = (newEmployee) => {
    setData((prevData) => [...prevData, newEmployee]);
  };

  const handleEdit = async (id) => {
    try {
      setShowEditForm(true);
      const response = await axios.get(
        `http://localhost:8000/api/employee/${id}`
      );
      setEmployeeToEdit(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="employee-management-container">
      {showAddForm && (
        <AddEmployeeForm
          onClose={() => setShowAddForm(false)}
          onAddEmployee={handleAddEmployee}
        />
      )}
      {showEditForm && employeeToEdit && (
        <AddEmployeeForm
          onClose={() => setShowEditForm(false)}
          initialData={employeeToEdit}
          onUpdateEmployee={(updatedEmployee) => {
            setData((prevData) =>
              prevData.map((item) =>
                item._id === updatedEmployee._id ? updatedEmployee : item
              )
            );
            setShowEditForm(false);
          }}
        />
      )}
      <h1 className="banner">Employee Management Software</h1>
      <div className="button-group">
        <button
          className="action-btn add-employee"
          onClick={() => setShowAddForm(true)}
        >
          Add Employee
        </button>
        <button className="action-btn logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {data.length > 0 ? (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row._id}>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.email}</td>
                  <td>{row.salary}</td>
                  <td>{row.date}</td>
                  <td>
                    <div className="action">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEdit(row._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn del"
                        onClick={() => {
                          setEmployeeToDelete(row._id);
                          setOpenConfirmDialog(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>No Employee</h1>
      )}

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this employee?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>No</Button>
          <Button onClick={handleDelete} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableComponent;
