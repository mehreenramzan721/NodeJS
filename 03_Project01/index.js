const express = require('express');


const app = express();
const PORT = 8622;

const users = require('./MOCK_DATA.json');
// routes

app.get('/users', (req, res)=>{
    return res.json(users);
});



app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)});