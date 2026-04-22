import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import pic from "../../public/logo.jpg";
import BottomNavigation from "../components/BottomNavigation";
import { useGetReelsByUserQuery,} from "../features/api/ReelApi";
import { useGetProfileQuery } from "../features/api/AuthApi";
import { UserLogout } from "../features/AuthSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const [vedios, setVedios] = useState([]);
 const { data: reelsByUser } = useGetReelsByUserQuery();
  const { data: profile, error: profileError } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

   useEffect(() => {
    setVedios(reelsByUser?.reelItems || []);
  }, [reelsByUser]);

 

 

  const handleLogout = () => {
    dispatch(UserLogout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

 
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col pb-32">
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-slate-800 to-slate-700 border-b border-blue-500/20 sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Profile</h1>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 mb-8 backdrop-blur-md shadow-xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture Section */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-lg opacity-60 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-2xl">
                  <img
                    src={pic}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full ring-4 ring-white/30"
                  />
                </div>
              </div>
            </div>

            {/* Profile Info Section */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {profile?.user?.fullName || "User Profile"}
              </h2>
              <p className="text-blue-200 text-lg mb-6">
                {profile?.user?.email || "user@example.com"}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 hover:border-blue-400/50 transition-all">
                  <p className="text-blue-200 text-xs font-medium uppercase">Reels Created</p>
                  <p className="text-white text-2xl font-bold mt-1">{profile?.user?.totalReels || 0}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 hover:border-purple-400/50 transition-all">
                  <p className="text-purple-200 text-xs font-medium uppercase">Total Views</p>
                  <p className="text-white text-2xl font-bold mt-1">
                    {vedios?.reduce((sum, v) => sum + (v.views || 0), 0) || 0}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 hover:border-pink-400/50 transition-all col-span-2 md:col-span-1">
                  <p className="text-pink-200 text-xs font-medium uppercase">Total Likes</p>
                  <p className="text-white text-2xl font-bold mt-1">
                    {vedios?.reduce((sum, v) => sum + (v.likes || 0), 0) || 0}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/create-reel")}
                  className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="text-xl">+</span>
                  Create New Reel
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reels Section */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
          <h3 className="text-white text-2xl font-bold mb-2 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
            Your Reels
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            {vedios?.length} reel{vedios?.length !== 1 ? "s" : ""} created
          </p>

          {vedios?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {vedios.map((v1, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 aspect-video shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/10 hover:border-blue-400/50 cursor-pointer"
                >
                  <video
                    src={v1.video}
                    controls
                    muted
                    playsInline
                    loop
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-blue-400/50 transition-all duration-300"></div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white text-sm font-semibold">Views: {v1.views || 0}</p>
                      <p className="text-white text-sm">Likes: {v1.likes || 0}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="mb-4">
                  <div className="text-6xl mb-2">🎬</div>
                </div>
                <p className="text-white text-xl font-semibold mb-2">No reels yet</p>
                <p className="text-gray-400 text-base mb-6">
                  Start creating content to share with your audience
                </p>
                <button
                  onClick={() => navigate("/create-reel")}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  Create Your First Reel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center items-center z-50">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Profile;
