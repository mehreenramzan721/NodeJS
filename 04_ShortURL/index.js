const express = require('express');
const path = require('path');

const urlRouter = require('./routes/url');
const URL = require('./models/url');
const staticRoute = require('./routes/staticrouter');
const mongoose = require('mongoose');
const { connectToMongoDB } = require('./connect');
const PORT = 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url",urlRouter);

app.use('/', staticRoute);
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


connectToMongoDB('mongodb://localhost:27017/shorturl');

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });

