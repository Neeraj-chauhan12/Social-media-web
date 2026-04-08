const jwt=require('jsonwebtoken')
const foodPartnerModel=require('../model/foodPartnermodel')

exports.foodAuthMiddleware=async(req,res,next)=>{
    const token=req.cookies.token;

    if(!token){
        return res.status(400).json({error:"please login first"})
    }
   
    try {
     const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const foodPartner=await foodPartnerModel.findById(decoded.id)
    req.foodPartner=foodPartner;
    next()
        
    } catch (error) {
        res.status(500).json({error:"token not found"})
        
    }
   
    

}