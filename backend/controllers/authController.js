const User = require('../models/userModule')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: __dirname + '\\..\\..\\.env' });

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    let errors = { username: null, password: null };

    if (username.length == 0) {
        errors.username = 'Username is required';
    } 
    if (password.length == 0) {
        errors.password = 'Password is required';
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            username: username, 
            password: hashedPassword
        });
        res.status(201).json('New user created');
    } catch (error) {
        console.log(error);
        if (error.mame == 'MongoServerError') {
            if (error.code == 11000) {
                errors.username = 'Username already taken';
            }
        }
        res.status(400).json({ errors });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    let errors = { username: null, password: null };

    if (username.length == 0) {
        errors.username = 'Username is required';
    } 
    if (password.length == 0) {
        errors.password = 'Password is required';
    }

    try {
        const realUser = await User.findOne({ username });
        if (!realUser) {
            errors.password = 'Username or password are incorrect';
            return res.status(401).json({ errors });
        }

        const auth = await bcrypt.compare(password, realUser.password);

        if (auth) {
            // correct password
            const token = await jwt.sign(
                { id: realUser._id },
                process.env.AUTH_TOKEN
            )
            res.cookie('jwt', token);
            res.status(200).json('Logged in');
        } else {
            // incorrect password
            error.password = 'Username or password are incorrect';
            res.status(400).json({ errors });
        }

    } catch (error) {
        console.log(error);
        res.json({ error: error.name });
    }
}


module.exports = {
    loginUser,
    registerUser
}