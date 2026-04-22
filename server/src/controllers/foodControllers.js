const ReelModel=require('../model/foodModel')
const storageService=require('../services/service')
const likeModel=require('../model/likesModel')
const savedModel=require('../model/saveModel')
const {v4: uuid}=require('uuid')


exports.createReel=async(req,res)=>{
    const {name,description}=req.body;
    const fileUploadResult=await storageService.uploadFile(req.file.buffer, uuid())
    const reelItem=await ReelModel.create({
        name,
        description,
        video:fileUploadResult.url,
        userId:req.user._id

    })
    res.status(201).json({message:"Reel created succuffully",reelItem})

}


exports.getReelData=async(req,res)=>{
    const userId = req.user._id;
    
    const reelItems=await ReelModel.find({}).lean();
    
    // Check which reels are liked by current user
    const likedReels = await likeModel.find({ user: userId }).select('reel');
    const likedReelIds = new Set(likedReels.map(l => l.reel.toString()));
    
    // Add isLiked field to each reel
    const reelsWithLikeStatus = reelItems.map(reel => ({
        ...reel,
        isLiked: likedReelIds.has(reel._id.toString())
    }));
    
    res.status(200).json({message:"Reel items retrieved successfully", reelItems: reelsWithLikeStatus})
}


exports.getReelByIdUser=async(req,res)=>{
  try {
    const userId=req.user._id
    console.log("User ID:", userId); // Debugging log to check the user ID
    const totalReels=await ReelModel.countDocuments({userId})
    const reelItems=await ReelModel.find({userId})
    res.status(200).json({message:"Reel items retrieved successfully", totalReels, reelItems})
    
  } catch (error) {
    
    res.status(500).json({error:"Error retrieving reel items for the user", error})
  }
    
  
}
   

exports.likedReel=async(req,res)=>{
    const { reelId }=req.body;
    const user=req.user;

    const isAlreadyLiked=await likeModel.findOne({
            user: user._id, 
            reel: reelId
        })

    if(isAlreadyLiked){
        await likeModel.deleteOne({user: user._id, reel: reelId})
        await ReelModel.findByIdAndUpdate(reelId,{$inc:{likeCount:-1}})
        return res.status(200).json({message:"Reel item unliked successfully", isAlreadyLiked})
    }

    const like= await likeModel.create({
        user: user._id,
        reel: reelId,
    })
    await ReelModel.findByIdAndUpdate(reelId,
        {$inc:{likeCount:1}}
    )
    return res.status(200).json({message:"Reel item liked successfully", like})

}

exports.savedReel=async(req,res)=>{
    const { reelId }=req.body;
    const user=req.user;

    const isAlreadySaved=await savedModel.findOne({user: user._id, reel: reelId})
    if(isAlreadySaved){
        await savedModel.deleteOne({user: user._id, reel: reelId})
        await ReelModel.findByIdAndUpdate(reelId,{$inc:{saveCount:-1}})
        return res.status(200).json({message:"Reel item unsaved successfully", isAlreadySaved})
             
    }    

    const newSaved=await savedModel.create({
        user: user._id,
        reel: reelId
    })
    await ReelModel.findByIdAndUpdate(reelId,
        {$inc:{saveCount:1}}
    )   

    return res.status(200).json({message:"Reel item saved successfully", newSaved})
}


exports.getSaveReels=async(req,res)=>{
    const user=req.user;
    const savedReels=await savedModel.find({user:user._id}).populate('reel')
    if(!savedReels || savedReels.length===0){
        return res.status(200).json({message:"No saved reel items found", savedReels: []})
    }
    res.status(200).json({message:"Saved reel items retrieved successfully", savedReels})
}
