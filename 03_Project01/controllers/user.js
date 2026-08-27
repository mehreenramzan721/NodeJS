const Users = require('../models/user');

async function handleGetAllUsers(req, res) {
    const allDbUsers = await Users.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404)
                .json({ status: 'error', message: 'User not found' });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ status: 'error', message: err.message });
    }
}

async function handleUpdateUserbyId(req, res) {
    try {
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, { lastName: "changed" }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        return res.json({ status: 'success', data: updatedUser });
    } catch (err) {
        return res.status(500).json({ status: 'error', message: err.message });
    }
}

async function handleDeleteUserById(req, res) {
    try {
        const user = await Users.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        return res.json({ status: 'success' });
    } catch (err) {
        return res.status(500).json({ status: 'error', message: err.message });
    }
}

async function handleCreateUser(req, res) {
    try {
        const body = req.body;
        if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields' });
        }
        const result = await Users.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            jobTitle: body.job_title,
            gender: body.gender,

        });
        console.log(result)
        return res.status(201).json({ msg: 'User created successfully', id:result._id });
    } catch (err) {
        return res.status(500).json({ status: 'error', message: err.message });
    }
}



module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserbyId,
    handleDeleteUserById,
    handleCreateUser
}