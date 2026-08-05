const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')

const urlRouter = require('./routes/url');
const staticRoute = require('./routes/staticrouter');
const userRoute = require('./routes/user')

// const { restricttologinUserOnly, checkAuth } = require('./middleware/Auth')
const { checkForAuthentication, restrictTo } = require('./middleware/Auth')


const URL = require('./models/url');
const mongoose = require('mongoose');
const { connectToMongoDB } = require('./connect');
const PORT = 8000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(checkAuth);
app.use(checkForAuthentication);

// app.use("/url", restricttologinUserOnly, urlRouter);
app.use("/url", restrictTo(["NORMAL"]), urlRouter);

app.use('/', staticRoute);
app.use('/user', userRoute);



app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


connectToMongoDB('mongodb://localhost:27017/shorturl');

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
