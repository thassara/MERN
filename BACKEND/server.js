const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
const stockRouter = require('./Routes/stockRoutes');
const restockRouter = require('./Routes/restockRoutes');
const assign_itemsRouter = require('./Routes/assign_itemsRoutes');

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


app.use("/items", stockRouter);
app.use("/restock", restockRouter);
app.use("/assign_items", assign_itemsRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
