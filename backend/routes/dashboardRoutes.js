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
router.get('/getTeamInfo/:id', dashboardController.getTeamInfo)
router.delete('/deleteStaff/:id', dashboardController.deleteStaff)
router.post('/addToSchedule/:id', dashboardController.addToSchedule)
router.get('/getSchedule/:id', dashboardController.getSchedule)
router.post('/addVideo/:id', dashboardController.addVideo)
router.get('/getVideos/:id', dashboardController.getVideos)

module.exports = router