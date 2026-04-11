import React, { useEffect, useState } from 'react'
import ReelsPart from './ReelsPart';
import { useGetSaveReelsQuery, useSaveReelsMutation } from '../features/api/ReelApi';
import toast from 'react-hot-toast';

const SavedReel = () => {
    const [videos, setVideos] = useState([]);
    const [saveReels] = useSaveReelsMutation();
    const { data: savedReels, refetch } = useGetSaveReelsQuery();

    useEffect(() => {
        if (savedReels?.savedReels) {
            const formattedReels = savedReels.savedReels.map((item) => ({
                _id: item.reel._id,
                video: item.reel.video,
                description: item.reel.description,
                likeCount: item.reel.likeCount,
                saveCount: item.reel.saveCount,
                user: item.reel.user,
            }));
            setVideos(formattedReels);
        } else {
            setVideos([]);
        }
    }, [savedReels]);



   
    const removeSaved = async (item) => {
        try {
            await saveReels({ reelId: item._id }).unwrap();
            toast.success("Reel removed from saved successfully");
            setVideos((prev) => prev.filter((v) => v._id !== item._id));
            await refetch();
        } catch (error) {
            console.error("Error removing saved reel:", error);
            toast.error("Failed to remove reel from saved. Please try again.");
        }
    }


  return (
    <ReelsPart videos={videos}  onSave={removeSaved}     emptyMessage="No Saved Reels Yet!"  />
  )
}

export default SavedReel


