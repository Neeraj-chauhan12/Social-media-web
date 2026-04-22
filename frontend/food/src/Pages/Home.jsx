import React, { useEffect, useState } from 'react'
import ReelsPart from '../components/ReelsPart';
import { useGetReelsQuery, useGetSaveReelsQuery, useLikeReelsMutation, useSaveReelsMutation } from '../features/api/ReelApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';




const Home = () => {

  const navigate = useNavigate()

  const [videos, setVideos] = useState([]);

  const { data, isLoading, refetch } = useGetReelsQuery();
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
    // Call the like API
    await likeReels(video._id).unwrap();
    
    // Just refetch to get the actual count from backend
    await refetch();
  } catch (error) {
    console.error("Error liking video:", error);
    toast.error("Failed to like video. Please try again.");
  }
}

const handlesaves = async (item) => {
  try {
    // Call the save API
    await saveReels(item._id).unwrap();
    
    // Just refetch to get the actual count from backend
    await refetch();
  } catch (error) {
    console.error("Error saving video:", error);
    toast.error("Failed to save video. Please try again.");
  }
}

  return (
    <ReelsPart 
      videos={videos} 
      isLoading={isLoading} 
      onLike={handlelikes} 
      onSave={handlesaves} 
      emptyMessage="No Reels Yet!" 
    />
  );
}

export default Home
