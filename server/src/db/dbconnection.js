const mongoose=require('mongoose')


const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("mongodb is connected")
    })
    .catch((err)=>{
        console.log("error in mongodb connection", err)
    })
}

module.exports=dbConnection