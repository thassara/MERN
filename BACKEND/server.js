// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import custom routes
const issueDeliveryRoutes = require('./Routes/issueDeliveryRoute.js'); 
const vehicleRoutes = require('./Routes/vehicleRoutes.js');
// Initialize Express app

//const orderRoutes = require('./Routes/orderRoute.js');
const or_Routes = require("./Routes/Order");
require('dotenv').config();
const stockRouter = require('./Routes/stockRoutes');
const restockRouter = require('./Routes/restockRoutes');
const assign_itemsRouter = require('./Routes/assign_itemsRoutes');

//8070
const app = express();

// Import routes
const expenseRoutes = require('./Routes/ExpenseRoutes.js');
const PMprofileRoutes = require('./Routes/PMprofile.js');
const paymentRoutes = require('./Routes/paymentRoutes.js');


const PORT = process.env.PORT||8070;

const employeeRoutes = require('./Routes/employeeRoutes.js'); 
const attendanceRoutes = require('./Routes/attendanceRoutes.js');
const managerRoutes = require('./Routes/managerRoutes.js');


// Middleware
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/issue-delivery', issueDeliveryRoutes); // Issue Delivery Routes
app.use('/api/vehicle', vehicleRoutes);              // Vehicle Routes     


// Connect to MongoDB
// Employee section

app.use('/api', employeeRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', managerRoutes);
app.use('/orders',or_Routes);
//app.use('/api/orders', orderRoutes);   

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

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection Success");
});

app.use("/items", stockRouter);
app.use("/restock", restockRouter);
app.use("/assign_items", assign_itemsRouter);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on Port number: ${PORT}`);

});
