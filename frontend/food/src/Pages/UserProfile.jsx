import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useGetProfileQuery, useLogoutMutation } from '../features/api/AuthApi'

const UserProfile = () => {
  const navigate = useNavigate()
  
  const [getProfile]=useGetProfileQuery();
  const [logout]=useLogoutMutation();
 
  useEffect(() => {  
    const { data } = getProfile();
    if (data) {
      console.log("User profile data:", data);
    }
  }, [getProfile]);

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const user="neeraj"
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <div className="space-y-2">
          <div><strong>Name:</strong> {user?.fullName || user?.name || 'N/A'}</div>
          <div><strong>Email:</strong> {user?.email || 'N/A'}</div>
        </div>
        <div className="mt-6 flex gap-2">
          <button onClick={() => navigate('/')} className="px-4 py-2 bg-blue-600 text-white rounded">Home</button>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">Logout</button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
