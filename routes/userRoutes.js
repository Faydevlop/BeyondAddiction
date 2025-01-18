const express = require('express');
const { loginUser,createUser, signupGuest, loginGuest } = require('../controllers/userController');
const router = express.Router();



// POST create a new user (with credentials)
router.post('/signup', createUser);

// POST login to an existing account (with credentials)
router.post('/login', loginUser);

// POST create a guest Account (without credentials - email)
router.post('/signup/guest', signupGuest);

// POST create a guest Account (without credentials - email)
router.post('/login/guest', loginGuest);



module.exports = router;
