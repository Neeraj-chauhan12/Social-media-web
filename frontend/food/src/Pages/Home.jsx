import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReelsPart from '../components/ReelsPart';
import { useGetReelsQuery, useGetSaveReelsQuery, useLikeReelsMutation, useSaveReelsMutation } from '../features/api/ReelApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';




const Home = () => {

  const navigate = useNavigate()

  const [videos, setVideos] = useState([]);

  const { data, isLoading, isError } = useGetReelsQuery();
  const [likeReels] = useLikeReelsMutation();
  const [saveReels] = useSaveReelsMutation();
  const { data: savedReels } = useGetSaveReelsQuery();
 
  useEffect(() => {

    if(data?.reelItems?.length === 0){
      navigate('/create-reel');
    }

    if (data && data.reelItems) {
      setVideos(data.reelItems);
    }

  }, [data]);
  



const handlelikes = async (video) => {

  try {
     const response = await likeReels(video._id).unwrap();
        console.log("like response",response);
        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === video._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === video._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
    
  } catch (error) {
    console.error("Error liking video:", error);
    toast.error("Failed to like video. Please try again.");
    
  }
       
  
}

const handlesaves= async (item) =>{
    const response = await saveReels(item._id).unwrap();
    console.log("save response",response);

 
  if(response.data.newSaved){
    console.log("Video saved");
    setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount + 1 } : v))
  }
  else{
    console.log("Video unsaved");
    setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount - 1 } : v))
  }
}

  return (
    
    
        <ReelsPart videos={videos} isLoading={isLoading} onLike={handlelikes} onSave={handlesaves} emptyMessage="No Reels Yet!" />

            );
          }

export default Home
