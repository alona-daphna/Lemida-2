const User = require('../models/userModule')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: __dirname + '\\..\\..\\.env' });

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (username.length == 0) {
        return res.status(401).json({error: 'Username is required'});
    } 
    if (password.length == 0) {
        return res.status(401).json({error: 'Password is required'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            username: username, 
            password: hashedPassword
        });
        return res.status(201).json('New user created');
    } catch (error) {
        console.log(error);
        if (error.name == 'MongoServerError') {
            if (error.code == 11000) {
                return res.status(400).json({error: 'Username already taken'});
            }
        }
        return res.status(401).json({error: error});
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (username.length == 0) {
        return res.status(401).json({error: 'Username is required'});
    } 
    if (password.length == 0) {
        return res.status(401).json({error: 'Password is required'});
    }

    try {
        const realUser = await User.findOne({ username });
        if (!realUser) {
            return res.status(401).json({ error: 'Username or password are incorrect' });
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
            return res.status(401).json({ error: 'Username or password are incorrect'});
        }

    } catch (error) {
        console.log(error);
        return res.json({ error: error.name });
    }
}

const logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}


module.exports = {
    loginUser,
    registerUser,
    logout
}
