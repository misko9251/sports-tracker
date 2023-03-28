const express = require('express')
const router = express.Router()
const statsController = require('../controllers/statsController')

router.post('/addGoal', statsController.addGoal)

module.exports = router