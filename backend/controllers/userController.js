const User = require('../models/userModule')


// get a single user
const getUser = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid user ID.' });
    }
    const user = await User.findById(req.params.id).select({ password: 0 });
    if (!user) return res.status(404).json({error: 'User not found'})
    res.status(200).json(user);
}

// get a list of all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select({ password: 0 });
        res.status(200).json(users);    
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to retrieve users.'})
    }
}

//  update user name or password
const updateUser = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid user ID.' });
    }
    const { username, password } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { username, password },
            // return the updated user
            {new: true}
        ).select({ password: 0 });
        if (!user) return res.status(404).json({error: 'User not found'})
        res.status(200).json(user);    
    } catch (error) {
        console.log(error)
        res.status(400).json({error: 'Failed to update user'})
    }

}

// delete user
const deleteUser = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid user ID.' });
    }
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        if(!user) return res.status(404).json({error: 'User not found'})
        res.status(200).json(user);    
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to delete user'})
    }
}

module.exports = {
    getUser,
    getUsers,
    updateUser,
    deleteUser
}