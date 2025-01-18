const express = require('express');
const { loginUser,createUser, signupGuest } = require('../controllers/userController');
const router = express.Router();



// POST create a new user (with credentials)
router.post('/signup', createUser);

// POST login to an existing account (with credentials)
router.post('/login', loginUser);

// POST create a guest Account (with credentials)
router.post('/login/guest', signupGuest);



module.exports = router;
