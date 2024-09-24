const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const machine_Routes = require("./Routes/machine.js");
const orderqueue_Routes = require("./Routes/orderqueue.js");

require('dotenv').config();

//8070
const PORT = process.env.PORT||8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
   // useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => { 
    console.log("MongoDB Connection Success");
});

const studentRouter = require("./Routes/students.js");
app.use("/student",studentRouter);


app.use("/machines",machine_Routes);
app.use("/orders",orderqueue_Routes);


app.listen(PORT, () => {
    console.log(`Server is up and running on Port numberbbgg: ${PORT}`);
});







