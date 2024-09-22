const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const employeeRoutes = require('./Routes/employeeRoutes.js'); // Move this line up
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Employee section
app.use('/api', employeeRoutes);

const PORT = process.env.PORT || 8070;

const URL = process.env.MONGODB_URL;


mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => { 
    console.log("MongoDB Connection Success");
});

// Student routes
const studentRouter = require("./Routes/students.js");
app.use("/student", studentRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on Port number: ${PORT}`);
});
