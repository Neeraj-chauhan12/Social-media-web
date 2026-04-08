const express= require('express')
const router=express.Router()
const { UserRegister, UserLogin, UserLogout } = require('../controllers/userControllers')



router.post('/register',UserRegister)
router.post('/login',UserLogin)
router.get('/logout',UserLogout)
module.exports = router;