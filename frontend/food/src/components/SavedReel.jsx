import React, { useEffect, useState } from 'react'
import ReelsPart from './ReelsPart';
import axios from 'axios';

import { useSaveReelsMutation } from '../features/api/ReelApi';
import toast from 'react-hot-toast';

const SavedReel = () => {
    const [videos, setVideos] = useState([]);
    const [saveReels, { isLoading }] = useSaveReelsMutation();

   

   useEffect(()=>{
    try {
    const res=saveReels().unwrap();
    console.log("Saved reels response:", res);
    const savedFoods = res?.savedReels?.map((item) => ({
        _id: item.reel._id,
        video: item.reel.video,
        description: item.reel.description,
        likeCount: item.reel.likeCount,
        saveCount: item.reel.saveCount,
        user: item.reel.user,
    })) || [];
      
    setVideos(savedFoods);
        
    } catch (error) {
        console.error("Error fetching saved reels:", error);
        toast.error("Failed to fetch saved reels. Please try again.");
    }
   },[])



      // const savedFoods = response.data.savedFoods.map((item) => ({
            //         _id: item.food._id,
            //         video: item.food.video,
            //         description: item.food.description,
            //         likeCount: item.food.likeCount,
            //         saveCount: item.food.saveCount,
            //         foodPartner: item.food.foodPartner,
            //     }))
              
            //     setVideos(savedFoods);
    // const removeSaved = async (item) => {
    //     try {
    //         await axios.post(`${BACKEND_URL}/api/auth/food/save`, { foodId: item._id }, { withCredentials: true })
    //         setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: Math.max(0, (v.saveCount ?? 1) - 1) } : v))
    //     } catch {
    //         // noop
    //     }
    // }


  return (
    <ReelsPart videos={videos}  emptyMessage="No Saved Reels Yet!"  />
  )
}

export default SavedReel


