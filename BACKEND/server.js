const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const or_Routes = require("./Routes/Order");
require('dotenv').config();

const PORT = process.env.PORT||8080;

app.use(cors());
app.use(express.json());


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


app.use("/items", stockRouter);
app.use("/restock", restockRouter);
app.use("/assign_items", assign_itemsRouter);

app.use("/orders",or_Routes);

app.listen(PORT, () => {
    console.log(`Server is up and running on Port number: ${PORT}`);
});
