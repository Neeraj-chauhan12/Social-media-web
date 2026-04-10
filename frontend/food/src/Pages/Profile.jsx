import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pic from "../../public/logo.jpg";
import BottomNavigation from "../components/BottomNavigation";
import { useGetReelsQuery } from "../features/api/ReelApi";
import { useGetProfileQuery } from "../features/api/AuthApi";

const Profile = () => {
  const [vedios, setVedios] = useState([]);
  const { data: reels } = useGetReelsQuery();
  const { data: profile } = useGetProfileQuery();
  const navigate = useNavigate();

  useEffect(() => {
    setVedios(reels?.reelItems || []); // Safely access reelItems with optional chaining and provide a default empty array
  }, [reels]);

  // useEffect(() => {
  //   axios.get(`${BACKEND_URL}/api/auth/partner/${id}`, {
  //     withCredentials: true
  //   }).then(res => {
  //     setProfileId(res.data.foodPartner);
  //     setVedios(res.data.foodPartner.foodItems);
  //   }).catch(err => {
  //     console.error(err);
  //   });

  // },[id])
  // Fetch food partner data from API

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center py-8 px-2 pb-32">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header/Profile Card */}
        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-purple-700 p-8 flex flex-col items-center shadow-2xl border border-blue-400/30">
          {/* Profile Picture */}
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-md opacity-75"></div>
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-xl">
              <img
                src={pic}
                alt="Profile"
                className="w-full h-full object-cover rounded-full ring-4 ring-white/20"
              />
            </div>
          </div>

          {/* Profile Name */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 text-white font-bold text-lg text-center mb-6 ring-1 ring-white/20">
            {profile?.user?.fullName || "Profile"}
          </div>

          {/* Stats Section */}
          <div className="flex w-full justify-center items-center gap-8 mb-6">
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl px-4  ring-1 ring-white/20 min-w-max">
              <span className="text-blue-100 text-sm font-medium uppercase tracking-wide">
                Total Reels
              </span>
              <span className="text-white text-3xl font-bold">
                {vedios?.length}
              </span>
            </div>

 {/* Create Reel Button */}
          <button
            onClick={() => navigate("/create-reel")}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Create Reel
          </button>

          </div>

         
         
        </div>

        {/* Video Grid */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/10">
          <h2 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
            Your Reels
          </h2>

          {vedios?.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {vedios.map((v1, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 aspect-video shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/10 hover:border-blue-400/50"
                >
                  <video
                    src={v1.video}
                    controls
                    muted
                    playsInline
                    loop
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-blue-400/50 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <p className="text-gray-400 text-lg">No reels yet</p>
                <p className="text-gray-500 text-sm mt-2">
                  Start creating content to see it here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full flex justify-center items-center z-50">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Profile;
