const express = require('express');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const router = express.Router();

// @route    POST /api/auth
// @desc     login user
// @access   public
router.post('/', [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty()
], async (req, res) => {
    // get errors
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {username, password} = req.body;

    try {
        // check if username is incorrect
        if(username !== 'admin') {
            return res.status(400).json({errors: [{msg: 'Invalid username or password'}]});
        }

        // check if password is incorrect
        if(password !== 'bsit--3a') {
            return res.status(400).json({errors: [{msg: 'Invalid username or password'}]});
        }

        // create payload
        const payload = {
            user: {
                username
            }
        };

        // create token
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.json(token);
    } catch(err) {
        console.error(err);
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

module.exports = router;