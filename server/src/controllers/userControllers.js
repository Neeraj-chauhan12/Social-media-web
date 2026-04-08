const UserModel=require('../model/usermodel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


exports.UserRegister=async(req,res)=>{

    const {fullName,email,password}=req.body;

    try {
    const userAlreadyExits=await UserModel.findOne({email})
    if(userAlreadyExits){
        return res.status(400).json({message:"user already exists"})
    }

    const HashPassword=await bcrypt.hash(password,10)

    const user=await UserModel.create({
        fullName,
        email,
        password:HashPassword
    })

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("token",token)

    res.status(200).json({message:"user register suuccessfull",user})
}
catch (error) {
       res.status(500).json({error:"error in register page",error});
       console.log(error)
    }


}



exports.UserLogin=async(req,res)=>{
    const {email,password}=req.body;

    try {

        const user=await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({error:"invalid credential"})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({error:"password is not match"})
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.cookie("token",token)

        res.status(200).json({message:"login successfull",user})
        
    } catch (error) {
        res.status(500).json({error:"error in login page"})
        console.log(error)
        
    }
}

exports.UserLogout=async(req,res)=>{
    try {
        res.clearCookie("token")
        res.status(200).json({message:"logout successfully"})
        
    } catch (error) {
        res.status(500).json({error:"error in logout page"})
        console.log(error)
        
    }

}