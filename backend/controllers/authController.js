const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = {
    registerUser: async (req, res) => {
        const {email, username, password, password2} = req.body
        const errors = []
        const emailTaken = await User.findOne({email: email})
        const usernameTaken = await User.findOne({username: username})
        if(!email || !username || !password || !password2){
            errors.push({msg: 'Please fill in all fields'})
        }
        if(password !== password2){
            errors.push({msg: 'Passwords must match'})
        }
        if(password.length < 6){
            errors.push({msg: 'Password must be at least 6 characters long'})
        }
        if(emailTaken){
            errors.push({msg: 'This email address is already in use'})
        }
        if(usernameTaken){
            errors.push({msg: 'This username is taken'})
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
    },
    isAuthenticated: async (req, res) => {
        try {
          const isAuthenticated = Boolean(req.user)
          res.status(200).json({ isAuthenticated })
        } catch (error) {
          console.log(error)
        }
      }
}