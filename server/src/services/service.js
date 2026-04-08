const ImageKit = require("imagekit");

const imagekit = new ImageKit({
     publicKey : process.env.IMAGEKIT_PUBLIC,
    privateKey : process.env.IMAGEKIT_PRIVATE,
    urlEndpoint : process.env.IMAGEKIT_URL,
});
// process.env.IMAGEKIT_PUBLIC
// process.env.IMAGEKIT_PRIVATE
// process.env.IMAGEKIT_URL



exports.uploadFile=async(file,fileName)=>{
    const result=await imagekit.upload({
    file : file, //required
    fileName : fileName,   //required
    })
   return result
}