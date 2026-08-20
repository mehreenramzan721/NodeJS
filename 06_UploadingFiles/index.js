const express = require('express');
const path = require('path');
const multer = require('multer');

// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

const PORT = 8002;

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    return res.render("homepage")
})

app.post('/upload',upload.single('profileimage'),(req,res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/');
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})