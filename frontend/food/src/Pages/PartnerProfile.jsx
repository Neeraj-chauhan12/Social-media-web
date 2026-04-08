import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../utiles/utiles'
import toast from 'react-hot-toast'

const PartnerProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [partner, setPartner] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  const handleLogout=()=>{
    localStorage.removeItem("partner");
    toast.success("Logged out successfully");
    navigate("/partner/login");
  }

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/auth/partner/${id}`, {
          withCredentials: true
        })
       
        setPartner(response.data.foodPartner)
        setVideos(response.data.foodPartner.foodItems || [])
       
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPartnerData()
    }
  }, [id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-4 space-y-6">
        {/* Header/Profile */}
        <div className="rounded-2xl bg-red-900 p-4 flex flex-col items-center mb-2">
          <div className="flex w-full items-center justify-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-green-900 flex items-center justify-center text-white text-xl font-bold">Logo</div>
            <div className="flex flex-col gap-2">
              <div className="bg-green-800 rounded-lg px-4 py-2 text-white font-semibold text-center">{partner?.fullName || 'Partner Name'}</div>
              <div className="bg-green-800 rounded-lg px-4 py-2 text-white font-semibold text-center">{partner?.address || 'Address'}</div>
            </div>
          </div>
          <div className="flex w-full justify-around items-center mt-2 mb-2">
            <div className="flex flex-col items-center">
              <span className="text-white text-base">total meals</span>
              <span className="text-white text-xl font-bold">{partner?.foodItems?.length ||0}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white text-base">customer serve</span>
              <span className="text-white text-xl font-bold">0</span>
            </div>
          </div>
          <hr className="border-gray-300 w-full my-2" />
        </div>

        {/* Video Grid */}
        <div className="bg-blue-900 rounded-xl p-4">
          <div className="grid grid-cols-2  gap-4">
            {videos.length > 0 ? (
              videos.map((video, idx) => (
                <div key={idx} className="aspect-video bg-blue-700 rounded-lg flex items-center justify-center text-white font-semibold text-lg shadow">
                  <video src={video.video} className="w-full h-52 object-cover rounded-lg" />
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-white py-8">No videos yet</div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-center">
            <button onClick={() => navigate('/')} className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">
            Home
          </button>
          <button onClick={() => navigate('/create-food')} className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">
            Create Reel
          </button>
          <button onClick={handleLogout} className="px-6 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default PartnerProfile
