const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const or_Routes = require("./Routes/Order");
require('dotenv').config();
const stockRouter = require('./Routes/stockRoutes');
const restockRouter = require('./Routes/restockRoutes');
const assign_itemsRouter = require('./Routes/assign_itemsRoutes');

const PORT = process.env.PORT||8080;

const employeeRoutes = require('./Routes/employeeRoutes.js'); 
const attendanceRoutes = require('./Routes/attendanceRoutes.js');
const managerRoutes = require('./Routes/managerRoutes.js');


// Middleware
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(express.json());

// Employee section

app.use('/api', employeeRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', managerRoutes);
app.use("/orders",or_Routes);

const URL = process.env.MONGODB_URL;


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



app.listen(PORT, () => {
    console.log(`Server is up and running on Port number: ${PORT}`);

});
