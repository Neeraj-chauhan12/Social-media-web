const jwt=require('jsonwebtoken')
const userModel=require('../model/usermodel')

const userAuthMiddleware=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"please login first"})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        user=await userModel.findById(decoded.id);
        req.user=user
        next();
    }catch(err){
        return res.status(401).json({message:"token not found"})
    }
}

module.exports=userAuthMiddleware;
