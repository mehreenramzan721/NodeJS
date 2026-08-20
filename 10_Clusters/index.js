const express = require ('express');
const app = express();

const PORT = 6000;

app.get('/', (req,res)=>{
    return res.json(`Hello from server ${process.pid}`)
})

app.listen(PORT, ()=> console.log(`Hello from server ${process.pid}`))