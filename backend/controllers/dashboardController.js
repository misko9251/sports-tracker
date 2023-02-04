const User = require('../models/User')

module.exports = {
    getDash: async (req, res) => {
        const user = await req.user
        // const currentUser = await User.find({_id: req.user._id})
        // const isCoach = currentUser.registeredCoach
        // const isParent = currentUser.registeredParent
        // res.status(200).json({isCoach: isCoach, isParent: isParent})
        console.log(user)
    }
}