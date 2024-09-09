const Employee = require('../models/employee')

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json({ success: true, data: employees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const getAllEmployeesById = async (req, res) => {

    try {
        const { id } = req.params;
        const employees = await Employee.findById(id);
        if (!employees) {
            throw new Error("No Id Found!")
        }
        res.json({ success: true, data: employees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Update employee by ID
const updateEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, salary, date } = req.body;

        // Find and update the employee
        const employee = await Employee.findByIdAndUpdate(
            id,
            { firstName, lastName, email, salary, date },
            { new: true }
        );

        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        res.json({ success: true, data: employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const deleteEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the employee
        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const createNewEmployee = async (req, res) => {
    try {
        const formData = req.body
        console.log(formData);
        const employee = await Employee.create(formData)
        console.log(employee);
        return res.json({ success: true, message: "Product Created Successfully", data: employee })
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = { createNewEmployee, getAllEmployees, getAllEmployeesById, updateEmployeeById, deleteEmployeeById }