const express= require('express')
const { foodPartnerRegister, foodPartnerLogout, foodPartnerLogin, getFoodPartnerProfileId } = require('../controllers/foodPartnerController')
const { foodAuthMiddleware } = require('../middlewares/foodAuthMiddleware')
const router=express.Router()




router.post('/register',foodPartnerRegister)
router.post('/login',foodPartnerLogin)
router.get('/logout',foodPartnerLogout)

router.get('/:id',foodAuthMiddleware,getFoodPartnerProfileId)
module.exports = router;