const express = require('express')
const router = express.Router()
const statsController = require('../controllers/statsController')

router.post('/addGoal/:teamId/player/:playerId', statsController.addGoal)
router.post('/addAssist/:teamId/player/:playerId', statsController.addAssist)
router.post('/addMissedShot/:teamId/player/:playerId', statsController.addMissedShot)
router.post('/addSave/:teamId/player/:playerId', statsController.addSave)

module.exports = router