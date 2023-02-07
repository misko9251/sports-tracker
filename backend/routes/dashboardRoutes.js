const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')

router.get('/getUser', dashboardController.getDash)
router.post('/questionnaire', dashboardController.addQuestionnaire)

module.exports = router