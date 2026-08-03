const express = require('express');

const urlRouter = require('./routes/url');
const mongoose = require('mongoose');
const { connectToMongoDB } = require('./connect');
const PORT = 8000;

const app = express();

app.use("/url",urlRouter);
connectToMongoDB('mongodb://localhost:27017/shorturl');

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });

