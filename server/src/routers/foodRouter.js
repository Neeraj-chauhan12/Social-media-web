const express = require('express')
const { foodAuthMiddleware } = require('../middlewares/foodAuthMiddleware')
const { createFood, getFoodData, likedFood, getSaveFood, savedFood } = require('../controllers/foodControllers')
const router=express.Router()
const multer=require('multer')
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')

const upload=multer({
    storage:multer.memoryStorage(),
})

router.post('/',foodAuthMiddleware,upload.single("video"),createFood)
router.get("/data",userAuthMiddleware,getFoodData)
router.post("/like",userAuthMiddleware,likedFood)
router.post("/save",userAuthMiddleware,savedFood)
router.get("/save",userAuthMiddleware,getSaveFood)


module.exports = router