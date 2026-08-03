const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
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
},{timestamps: true});

const User = mongoose.model('User', userSchema);

// post 
app.post('/api/users', async(req, res) => {
    try {
        const body = req.body;
        if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
            return res.status(400).json({ status: 'error', message: 'Missing required fields' });
        }
        const result = await User.create({ 
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            jobTitle: body.job_title,
            gender: body.gender,
        
        });
        console.log(result)
        return res.status(201).json({msg: 'User created successfully'});
    } catch (err) {
        return res.status(500).json({ status: 'error', message: err.message });
    }
});

// get all users 
app.get('/Users', async(req, res)=>{
    try {
        const allDBUsers = await User.find();
        return res.status(200).json({msg: 'All users fetched successfully', data: allDBUsers});
    } catch (err) {
        return res.status(500).json({ status: 'error', message: err.message });
    }
});

// others : 
app.route('/api/users/:id')
    .get(async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404)
                    .json({ status: 'error', message: 'User not found' });
            }
            return res.json(user);
        } catch (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
    })
    .patch(async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { lastName: "changed" }, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ status: 'error', message: 'User not found' });
            }
            return res.json({ status: 'success', data: updatedUser });
        } catch (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
    })
    .delete(async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            if (!user) {
                return res.status(404).json({ status: 'error', message: 'User not found' });
            }
            return res.json({ status: 'success'});
        } catch (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }
    });

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });