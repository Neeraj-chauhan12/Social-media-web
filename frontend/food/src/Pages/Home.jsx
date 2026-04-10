import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReelsPart from '../components/ReelsPart';




const Home = () => {

  const [videos, setVideos] = useState([]);

  if (!localStorage.getItem("user") && !localStorage.getItem("partner")) {
    window.location.href = "/user/login";
  }



const handlelikes = async (video) => {
        // // if(response.data.like){
        //     console.log("Video liked");
        //     setVideos((prev) => prev.map((v) => v._id === video._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        // }else{
        //     console.log("Video unliked");
        //     setVideos((prev) => prev.map((v) => v._id === video._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        // }
}

const handlesaves= async (item) =>{
  // const response = await axios.post(
  //   `${BACKEND_URL}/api/auth/food/save`,
  //   { foodId: item._id },
  //   { withCredentials: true }
  // );

  // console.log(response.data);
  // if(response.data.newSaved){
  //   console.log("Video saved");
  //   setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount + 1 } : v))
  // }
  // else{
  //   console.log("Video unsaved");
  //   setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount - 1 } : v))
  // }
}

  return (
    
    
        <ReelsPart videos={videos} onLike={handlelikes} onSave={handlesaves} emptyMessage="No Reels Yet!" />

            );
          }

export default Home
