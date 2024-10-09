const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import routes
const expenseRoutes = require('./Routes/ExpenseRoutes.js');
const PMprofileRoutes = require('./Routes/PMprofile.js');
const paymentRoutes = require('./Routes/paymentRoutes.js');

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB Connection Successful");
})
.catch((err) => {
    console.error("MongoDB Connection Error:", err);
});

// Define routes
app.use("/expenses", expenseRoutes); // Using /expenses for clarity
app.use("/PMprofiles", PMprofileRoutes); 
app.use("/payments", paymentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on Port: ${PORT}`);
});
