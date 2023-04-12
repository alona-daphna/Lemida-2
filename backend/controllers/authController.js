const User = require('../models/userModule')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: __dirname + '\\..\\..\\.env' });

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || username.length == 0) {
        return res.status(401).json({error: 'Username is required'});
    } 
    if (!password || password.length == 0) {
        return res.status(401).json({error: 'Password is required'});
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ error: 'Username is already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username, 
            password: hashedPassword
        });
        const newUser = await User.findById(user._id).select('-password');
        return res.status(201).json(newUser);
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

    if (!username || username.length == 0) {
        return res.status(401).json({error: 'Username is required'});
    } 
    if (!password || password.length == 0) {
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
            const user = await User.findById(realUser._id).select({password:0})
            res.status(200).json(user);
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
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({ message: 'Logout successful' });    
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to logout'})
    }
}


module.exports = {
    loginUser,
    registerUser,
    logout
}
