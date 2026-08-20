
const fs = require('fs')
const express = require ('express')
const app = express();

const zlib = require ('zlib')
const status = require('express-status-monitor')
app.use(status())

fs.createReadStream('./file.txt').pipe(zlib.createGzip().pipe(fs.createWriteStream('./file.txt')))
app.get('/',(req,res)=>{
    const stream = fs.createReadStream("./file.txt","utf-8")
    stream.on("data", (chunk)=> res.write(chunk))
    stream.on("end",()=>res.end())
})


app.listen(8000,()=>console.log(`port`))