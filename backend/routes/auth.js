const express = require('express');
const { signup, login } = require('../controller/authController');
const router = express.Router();


router.route('/signup').post(signup);

router.route('/login').post(login);

router.post('/logout', (req, res) => {    
    res.status(200).json({ message: 'Logged out successfully' });
});


module.exports = router;
