const User = require('../models/User')

module.exports = {
    getDash: async (req, res) => {
        try {
            console.log(req.user._id)
        } catch (error) {
            console.log(error)
        }
    }
}