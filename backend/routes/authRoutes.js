const express = require('express')
const router = express.Router()
const authContoller = require('../controllers/authController')
const passport = require("passport")


router.post('/register', authContoller.registerUser)
router.get('/isAuthenticated', authContoller.isAuthenticated)

router.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.json({message: "Email not found"});
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        return res.json({message: 'Success'});  
      });
    }
  })(req, res, next);
});

router.get('/logout', (req, res)=>{
  req.logout((err)=>{
      if(err){
          return next(err)
      }
      res.send({msg: 'User has logged out'})
  })
})

module.exports = router