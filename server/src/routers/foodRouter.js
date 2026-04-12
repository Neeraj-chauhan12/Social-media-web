const express = require('express')
const {getReelData, createReel, likedReel, savedReel, getSaveReels, getReelByIdUser } = require('../controllers/foodControllers')
const router=express.Router()
const multer=require('multer')
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')

const upload=multer({
    storage:multer.memoryStorage(),
})

router.post('/create',userAuthMiddleware,upload.single("video"),createReel)
router.get("/data",userAuthMiddleware,getReelData)
router.get("/user",userAuthMiddleware,getReelByIdUser)
router.post("/like",userAuthMiddleware,likedReel)
router.post("/save",userAuthMiddleware,savedReel)
router.get("/save",userAuthMiddleware,getSaveReels);


module.exports = router