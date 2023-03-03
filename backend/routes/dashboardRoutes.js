const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')

router.get('/getUser', dashboardController.getDash)
router.post('/questionnaire', dashboardController.addQuestionnaire)
router.post('/addTeam', dashboardController.addTeam)
router.get('/getTeams', dashboardController.getTeams)
router.get('/team/:id', dashboardController.teamProfile)
router.post('/addPlayer/:id', dashboardController.addPlayer)
router.post('/addStaff/:id', dashboardController.addStaff)

module.exports = router