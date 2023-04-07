const User = require('../models/userModule')


// get a single user
const getUser = async (req, res) => {
    const user = await User.findById(req.params.id).select({ password: 0 });
    res.status(200).json(user);
}

// get a list of all users
const getUsers = async (req, res) => {
    const users = await User.find({}).select({ password: 0 });
    res.status(200).json(users);
}

//  update user name or password
const updateUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { username, password },
        // return the updated user
        {new: true}
    ).select({ password: 0 });
    res.status(200).json(user);
}

// delete user
const deleteUser = async (req, res) => {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(user);
}

module.exports = {
    getUser,
    getUsers,
    updateUser,
    deleteUser
}