import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../utiles/utiles';


const CreateReel = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    } else {
      setVideoFile(null);
      setVideoUrl(null);
    }
  };

  const partner=JSON.parse(localStorage.getItem("partner"));
  console.log(partner._id);

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('name', name);
    formData.append('description', description);

    await axios.post(`${BACKEND_URL}/api/auth/food/`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then((Response)=>{
      
      navigate(`/partner/profile/${partner._id}`); // Redirect to partner profile
      toast.success("Reel Uploaded Successfully")
    })
    .catch((err)=>{
      console.log(err)
      toast.error("Error in Uploading Reel")
    })

      // Reset form 
      setVideoFile(null);
      setVideoUrl(null);
      setName("");
      setDescription("");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Create Reel</h2>
        <form 
        onSubmit={handleSubmit}
        className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video</label>
            <div className="relative w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer group">
              <input type="file" accept="video/*" id="video-upload" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleVideoChange} />
              <div className="flex flex-col items-center justify-center pointer-events-none">
                <svg className="w-10 h-10 text-blue-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16V8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l4 4m0 0l4-4m-4 4V8" /></svg>
                <span className="text-blue-500 font-semibold">Drag & drop or click to upload video</span>
                <span className="text-xs text-gray-500 mt-1">MP4, MOV, AVI up to 50MB</span>
              </div>
            </div>
            {videoUrl && (
              <div className="mt-4">
                <video src={videoUrl} controls className="w-full rounded-lg shadow" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" className="w-full px-4 py-2 rounded border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" rows={2} className="w-full px-4 py-2 rounded border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" maxLength={100} />
          </div>
          <button type="submit" className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">Upload Reel</button>
          
          
        </form>

        <button onClick={() => navigate('/')} className="px-6 w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">
            Home
          </button>
      </div>
    </div>
  );
}

export default CreateReel
