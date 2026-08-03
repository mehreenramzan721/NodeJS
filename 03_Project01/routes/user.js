const express = require('express');

const router = express.Router();

const { handleGetAllUsers ,handleGetUserById, handleCreateUser ,handleUpdateUserbyId, handleDeleteUserById } = require('../controllers/user');

// post 

// get all users 
router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateUser);


// others : 
router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserbyId)
    .delete(handleDeleteUserById)


module.exports = router;