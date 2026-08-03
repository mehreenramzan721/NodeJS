const Users = require('../models/user');

async function handleGetAllUsers(req, res) {
    const allDbUsers = await Users.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
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
}



module.exports = {
    handleGetAllUsers,
    handleGetUserById
}