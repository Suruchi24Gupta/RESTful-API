const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        let user = await User.findOne({ username });
        
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        user = new User({
            username,  //name of any person who is registering
            password,
        });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        await user.save();
        
        const payload = {
            
            user: {
                id: user.id,
            },
        };
        
        jwt.sign(
            payload,
            config.secret,
            { expiresIn: config.expiresIn },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
            );
        
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const payload = {
            user: {
                id: user.id,
            },
        };
        
        jwt.sign(
            payload,
            config.secret,
            { expiresIn: config.expiresIn },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = router;

/*successfully created the routes/auth.js file with the authentication routes for user registration and login. 
These routes use the user model and JWT configuration you've previously defined.
You can continue building your application and use these routes for user authentication.*/