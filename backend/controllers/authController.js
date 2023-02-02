const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = {
    registerUser: async (req, res) => {
        const {email, username, password, password2} = req.body
        const errors = []
        if(!email || !username || !password || !password2){
            errors.push({msg: 'Please fill in all fields'})
        }
        if(password !== password2){
            errors.push({msg: 'Passwords must match'})
        }
        if(password.length < 6){
            errors.push({msg: 'Password must be at least 6 characters long'})
        }
        if(errors.length > 0){
            res.status(400).json(errors)
        }
        else{
            const hashedPw = await bcrypt.hash(password, 10)
            const newUser = new User({
                email,
                username,
                password: hashedPw
            })
            await newUser.save()
            res.status(200).json({msg: 'User has been created and added to DB'})
        }
    }
}