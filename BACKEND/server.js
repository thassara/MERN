const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const issueDeliveryRoutes = require('./Routes/issueDeliveryRoute.js'); 
const vehicleRoutes = require('./Routes/vehicleRoutes.js');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//IssueDelivery Routes
app.use('/api/issue-delivery', issueDeliveryRoutes);

// Vehicle Routes
app.use('/api/vehicle', vehicleRoutes);


const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => { 
    console.log("MongoDB Connection Success");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on Port number: ${PORT}`);
});