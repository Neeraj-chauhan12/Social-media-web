
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import pic from '../../public/logo.jpg'
import BottomNavigation from '../components/BottomNavigation';
import { BACKEND_URL } from '../utiles/utiles';


const Profile = () => {
  const {id} = useParams();

  const [profileId, setProfileId] =useState(null);
  const [vedios,setVedios]=useState([])


  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/auth/partner/${id}`, {
      withCredentials: true
    }).then(res => {
      setProfileId(res.data.foodPartner);
      setVedios(res.data.foodPartner.foodItems);
    }).catch(err => {
      console.error(err);
    });

  },[id])
    // Fetch food partner data from API
    
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-2">
      <div className="w-full h-screen max-w-2xl bg-white rounded-2xl shadow-lg p-4 space-y-6">
        {/* Header/Profile */}
        <div className="rounded-2xl bg-red-900 p-4 flex flex-col items-center mb-2">
          <div className="flex w-full items-center justify-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-green-900 flex items-center justify-center text-white text-xl font-bold">
              <img src={pic} alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-green-800 rounded-lg px-4 py-2 text-white font-semibold text-center">{profileId?.fullName}</div>
              <div className="bg-green-800 rounded-lg px-4 py-2 text-white font-semibold text-center">{profileId?.address}</div>
            </div>
          </div>
          <div className="flex w-full justify-around items-center mt-2 mb-2">
            <div className="flex flex-col items-center">
              <span className="text-white text-base">total meals</span>
              <span className="text-white text-xl font-bold">43</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white text-base">customer serve</span>
              <span className="text-white text-xl font-bold">15K</span>
            </div>
          </div>
          <hr className="border-gray-300 w-full my-2" />
        </div>
        {/* Video Grid */}
        <div className="bg-blue-900 min-h-screen  w-full  rounded-xl p-2 ">
          <div className=" flex flex-wrap gap-2 ">
            {vedios.map((v1, idx) => (
              <div key={idx} className="aspect-video bg-blue-700 rounded-lg flex items-center h-56 w-36 justify-center text-white font-semibold text-lg shadow">
             <video
            src={v1.video}
            controls
            muted
            playsInline
            loop
            className="h-full w-full object-cover"
          />
              </div>
            ))}
          </div>
        </div>
      </div>

       <div className="fixed bottom-0 left-0 w-full flex justify-center items-center z-50">
        <BottomNavigation />

          </div>
    </div>
  );
}

export default Profile