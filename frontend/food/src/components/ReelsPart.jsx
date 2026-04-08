import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import BottomNavigation from './BottomNavigation';

const ReelsPart = ({ videos=[],onLike, onSave ,emptyMessage="no yet reel"}) => {

  const navigate = useNavigate()
  const partner = JSON.parse(localStorage.getItem("partner"));

  console.log("vedeos in reels part:", videos);

    const videoRefs = useRef(new Map())
    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const video = entry.target
              if (!(video instanceof HTMLVideoElement)) return
              if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                video.play().catch(() => { /* ignore autoplay errors */ })
              } else {
                video.pause()
              }
            })
          },
          { threshold: [0, 0.25, 0.6, 0.9, 1] }
        )
    
        videoRefs.current.forEach((vid) => observer.observe(vid))
        return () => observer.disconnect()
      }, [videos])
    const containerRef = React.useRef(null)
    
  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return }
    videoRefs.current.set(id, el)
  }

  return (

    videos.length === 0 ?
     <div className="h-screen w-screen flex items-center justify-center bg-black text-white text-xl font-semibold">{emptyMessage}</div> :
    <div
          ref={containerRef}
          className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-black"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          
          {videos.map((video, idx) => (
            <div
              key={idx}
              className="h-screen w-screen flex items-center justify-center snap-center relative"
            >
              <video
              ref={setVideoRef(video._id)}
                src={video.video}
                controls
                autoPlay
                loop
                className="h-full w-full object-cover"
              />
              {/* Right side icons */}
              <div className="absolute right-4 bottom-32 flex flex-col gap-4 items-center z-20">
                <div className="flex flex-col items-center">
                  <button onClick={onLike ? () => onLike(video) : undefined} className="bg-black/60 rounded-full p-2 mb-1 border border-gray-700">
                    <FaRegHeart className="w-8 h-8 text-white" />
                  </button>
                  <span className="text-white text-xs">{video.likeCount ?? video.likesCount ?? video.likeCount ?? 0}</span>
                </div>
    
    
                  <div className="flex flex-col items-center">
                  <button  className="bg-black/60 rounded-full p-2 mb-1 border border-gray-700">
                    <FaRegCommentDots className="w-8 h-8 text-white" />
                  </button>
                  <span className="text-white text-xs">{video.comments}</span>
                </div>
    
                <div className="flex flex-col items-center">
                  <button onClick={onSave ? () => onSave(video) : undefined} className="bg-black/60 rounded-full p-2 mb-1 border border-gray-700">
                    <FaRegBookmark className="w-8 h-8 text-white" />
                  </button>
                  <span className="text-white text-xs">{video.saveCount ?? video.saveCount ?? 0}</span>
                </div>
                
                
              </div>
              {/* ...existing code for description and visit store... */}
              <div className="absolute bottom-16 left-0 w-full flex flex-col items-center z-10 px-4 pb-8 pointer-events-none">
                <div className="w-full max-w-lg">
                  
                    <p className="text-white text-2xl  font-medium line-clamp-2  rounded px-2 hover:bg-gray-700/50 transition-colors" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                      {video.name || 'No name'}
                    </p>
                
                  <p className="px-2 rounded  text-white font-semibold ">{video?.description}</p>
                </div>
              </div>
    
              {/* Bottom Navigation */}
              <div className="fixed bottom-0 left-0 w-full flex justify-center items-center z-50">
            <BottomNavigation />
    
              </div>
            </div>
          ))} 
    
    
       </div>
  )
}

export default ReelsPart
