const express = require('express')
const router = express.Router()
const authContoller = require('../controllers/authContoller')

router.post('/', registerController.registerUser)

module.exports = router