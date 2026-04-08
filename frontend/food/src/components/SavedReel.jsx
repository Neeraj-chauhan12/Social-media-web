import React, { useEffect, useState } from 'react'
import ReelsPart from './ReelsPart';
import axios from 'axios';
import { BACKEND_URL } from '../utiles/utiles';

const SavedReel = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Fetch saved reels from API
        axios.get(`${BACKEND_URL}/api/auth/food/save`, {
            withCredentials: true
        })
        .then((response) => {
            
            const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    saveCount: item.food.saveCount,
                    foodPartner: item.food.foodPartner,
                }))
              
                setVideos(savedFoods)
            })
        .catch((error) => {
            console.error('Error fetching saved reels:', error);
        });
    }, []);

    const removeSaved = async (item) => {
        try {
            await axios.post(`${BACKEND_URL}/api/auth/food/save`, { foodId: item._id }, { withCredentials: true })
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: Math.max(0, (v.saveCount ?? 1) - 1) } : v))
        } catch {
            // noop
        }
    }


  return (
    <ReelsPart videos={videos} onSave={removeSaved} emptyMessage="No Saved Reels Yet!"  />
  )
}

export default SavedReel


