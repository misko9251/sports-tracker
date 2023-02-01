const express = require('express')
const router = express.Router()
const authContoller = require('../controllers/authController')

router.post('/register', authContoller.registerUser)

module.exports = router