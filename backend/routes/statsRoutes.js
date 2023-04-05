const express = require('express')
const router = express.Router()
const statsController = require('../controllers/statsController')

router.post('/updateHockeyStats/:teamId/event/:eventId', statsController.updateHockeyStats)
router.post('/updateBasketballStats/:teamId/event/:eventId', statsController.updateBasketballStats)


module.exports = router