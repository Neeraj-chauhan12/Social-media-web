import React, { useRef } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegCommentDots, FaRegBookmark } from "react-icons/fa";
import BottomNavigation from "./BottomNavigation";

const ReelsPart = ({ videos = [], onLike, onSave, emptyMessage = "No reels yet" }) => {
  const containerRef = useRef(null);

  const handleLike = (video) => {
    if (onLike) onLike(video);
  };

  // Simple scroll handler to play/pause videos
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const videos = containerRef.current.querySelectorAll("video");
    videos.forEach((video) => {
      const rect = video.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.top <= window.innerHeight * 0.5;
      
      if (isVisible) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  };

  if (videos.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white text-xl">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-black"
    >
      {videos.map((video, idx) => {
        // Get like status from backend data (isLiked field)
        const isLiked = video.isLiked || false;
        
        return (
          <div
            key={video._id || idx}
            className="h-screen w-screen flex items-center justify-center snap-center relative"
          >
            <video
              src={video.video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
            
            {/* Right side icons */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-4 items-center z-20">
              {/* Like Button - Red when liked, gray when not */}
              <button
                onClick={() => handleLike(video)}
                className="bg-black/60 rounded-full p-2"
              >
                {isLiked ? (
                  <FaHeart className="w-8 h-8 text-red-500" />
                ) : (
                  <FaRegHeart className="w-8 h-8 text-white" />
                )}
              </button>
              <span className="text-white text-xs">{video.likeCount || 0}</span>

              {/* Comment Button */}
              <button className="bg-black/60 rounded-full p-2">
                <FaRegCommentDots className="w-8 h-8 text-white" />
              </button>
              <span className="text-white text-xs">{video.comments || 0}</span>

              {/* Save Button */}
              <button
                onClick={() => onSave?.(video)}
                className="bg-black/60 rounded-full p-2"
              >
                <FaRegBookmark className="w-8 h-8 text-white" />
              </button>
              <span className="text-white text-xs">{video.saveCount || 0}</span>
            </div>

            {/* Description */}
            <div className="absolute bottom-16 left-0 w-full px-4 z-10">
              <p className="text-white text-xl font-medium">{video.name || "No name"}</p>
              <p className="text-white text-sm mt-1">{video.description}</p>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full z-50">
              <BottomNavigation />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReelsPart;
