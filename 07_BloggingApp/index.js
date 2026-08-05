const express = require ('express');
const path = require('path')
const app = express();
app.set('viewengine','ejs' );
app.set('views',path.resolve("./views"));

const PORT = 8000;

app.get('/', (req,res)=>{
    res.render('home')
})
app.listen(PORT , ()=>{
    console.log(`Server running at port : ${PORT}`)
})