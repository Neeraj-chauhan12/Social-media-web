const mongoose=require('mongoose')


const reelSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },

    userId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User"
    },
    totalReels:{
        type:Number,
        default:0
    },
    likeCount:{
        type:Number,
        default:0
    },
    saveCount:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model("Reel",reelSchema)