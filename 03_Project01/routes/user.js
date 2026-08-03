const express = require('express');

const router = express.Router();

const { handleGetAllUsers ,handleGetUserById, handleCreateUser ,handleUpdateUserbyId, handleDeleteUserById } = require('../controllers/user');

// post 
router.post('/', handleCreateUser);

// get all users 
router.get('/', handleGetAllUsers) ;


// others : 
router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserbyId)
    .delete(handleDeleteUserById)


module.exports = router;