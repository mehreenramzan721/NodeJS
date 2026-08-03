const express = require('express');
const fs = require('fs');

const mongoose = require('mongoose');

const app = express();
const PORT = 8622;

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Project1')
.then(()=>console.log('Connected to MongoDB'))
.catch((err)=>console.error('Error connecting to MongoDB:', err));
// Schema   
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String,
    }

})

const User = mongoose.model('User', userSchema);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const users = require('./MOCK_DATA.json');

// custom middleware

app.use((req,res,next) => {
    fs.appendFile('log.text', `\n${new Date()}: ${req.method} , ${req.path} ${req.url}\n`, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
    console.log("Hello from middleware 1 ")
    req.myUsername = 'John Doe';
    //this below retrun will only end the code here so we have to just call next not this line 
    // return res.json({status: 'success', message: 'Hello from middleware 1'});
    next();
})

app.use((req,res,next) => {
    console.log("Hello from middleware 2 "+ req.myUsername)
    next();
})

// routes

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    return res.send(html);
});

// REST API routes 

app.get('/api/users', (req, res) => {

    res.setHeader("X-myName", "John Doe"); // custom header 
    // good practice in custom headers to always add a prefix like x-  to avoid conflicts with standard headers
    return res.status(200).json(users);
});

// app.get('/api/users/:id', (req, res)=>{
//     const id = Number(req.params.id);
//     const user = users.find(u => u.id === id);
//     return res.json(user);
// });

app.post('/api/users', (req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }
    const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    users.push({ ...body, id: newId });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) return res.status(500).json({ status: 'error', error: err.message });
        return res.json({ status: 'success', id: newId });
    });
});


// app.patch('/api/users/:id', (req, res)=>{
//     // TODO : update user 
//     return res.json({status: pending});
// });

// app.delete('/api/users/:id', (req, res)=>{
//     // TODO : delete user 
//     return res.json({status: pending});
// });

app.route('/api/users/:id')
    .get((req, res) => {

        const id = Number(req.params.id);
        const user = users.find(u => u.id === id);
        if (!user) {
            return res.status(404)
                .json({ status: 'error', message: 'User not found' });
        }
        return res.json(user);
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return res.status(404).json({ status: 'error', message: 'User not found' });

        const { id: _ignore, ...safeBody } = req.body;
        users[index] = { ...users[index], ...safeBody };
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) return res.status(500).json({ status: 'error', error: err.message });
            return res.json({ status: 'success', id });
        });
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return res.status(404).json({ status: 'error', message: 'User not found' });

        users.splice(index, 1);
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) return res.status(500).json({ status: 'error', error: err.message });
            return res.json({ status: 'success', id });
        });
    });
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });