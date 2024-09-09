require('dotenv').config({ path: './backend/.env' });
const express = require('express');
const app = express();
const { connectToDatabase } = require('./config/connectToDatabase');
const employeeRoutes = require('./routes/employee')
const authRoutes = require('./routes/auth')
const cors = require('cors');

const mongoUri = process.env.MONGODB_URL;

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// app.use('/api', userRoutes);
app.use('/api', employeeRoutes)
app.use('/api/auth', authRoutes);


connectToDatabase(mongoUri)
    .then((result) => {
        console.log("MongoDB Connected");
        app.listen(process.env.PORT || 3000, () => { // Default to 3000 if PORT is not defined
            console.log(`Server started at PORT: http://localhost:${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
        process.exit(1); // Exit the process if there’s an error connecting to the database
    });
