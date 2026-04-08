const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    fullName:{
     required:true,
     type:String
    },
    email:{
        required:true,
        type:String, 
        unique:true    
    },

    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)

module.exports=mongoose.model("user",userSchema)