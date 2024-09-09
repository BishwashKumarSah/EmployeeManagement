const { Schema, model } = require('mongoose');

const EmployeeSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salary: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Employee = model('Employee', EmployeeSchema);

module.exports = Employee;
