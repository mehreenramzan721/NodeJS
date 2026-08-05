const express = require('express');
const path = require('path');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

const PORT = 8002;

app.use(express.json())

app.get('/', (req, res) => {
    return res.render("homepage")
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})