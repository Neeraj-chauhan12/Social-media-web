const express= require('express')
const router=express.Router()
const { UserRegister, UserLogin, UserLogout, UserProfile } = require('../controllers/userControllers')
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')



router.post('/register',UserRegister)
router.post('/login',UserLogin)
router.get('/logout',UserLogout)
router.get('/profile',userAuthMiddleware,UserProfile)

module.exports = router;