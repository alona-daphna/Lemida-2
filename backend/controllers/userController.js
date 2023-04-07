const User = require('../models/userModule')


// get a single user
const getUser = async (req, res) => {
    const user = await User.findById(req.params.id).select({ username: 1 });
    res.status(200).json(user);
}

// get a list of all users
const getUsers = async (req, res) => {
    const users = await User.find({}).select({ username: 1 });
    res.status(200).json(users);
}

//  update user name or password
const updateUser = async (req, res) => {
    const { username, password } = req.body;

    const response = await User.updateOne(
        { _id: req.params.id },
        { username, password }
    );
    res.status(200).json('User updated');
}

// delete user
const deleteUser = async (req, res) => {
    const response = await User.deleteOne({ _id: req.params.id });
    res.status(200).json('User deleted');
}

module.exports = {
    getUser,
    getUsers,
    updateUser,
    deleteUser
}