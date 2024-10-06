const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');


const app = express();

// Import routes
const expenseRoutes = require('./Routes/ExpenseRoutes.js');
const PMprofileRoutes = require('./Routes/PMprofile.js');
const slipRoutes = require('./Routes/slipRoutes.js');
const paymentRoutes = require('./Routes/paymentRoutes.js');
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => { 
    console.log("MongoDB Connection Successful");
});


app.use("/expenses", expenseRoutes); // Using /expenses for clarity
app.use("/PMprofiles", PMprofileRoutes); 
app.use("/slips", slipRoutes);
app.use("/payments", paymentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log(`Server is up and running on Port: ${PORT}`);
});
