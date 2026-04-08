import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegBookmark } from "react-icons/fa";
import { IoHome, IoPerson } from "react-icons/io5";

const BottomNavigation = () => {
  const navigate = useNavigate()

  const handleProfileClick = () => {
    const partner = (() => { try { return JSON.parse(localStorage.getItem('partner')) } catch (e) { return null } })()
    const user = (() => { try { return JSON.parse(localStorage.getItem('user')) } catch (e) { return null } })()

    if (partner) {
      navigate(`/partner/profile/${partner._id}`)
      return
    }
    if (user) {
      navigate('/user/profile')
      return
    }

    navigate('/user/login')
  }

  return (
    <div className="w-full bg-gray-500 flex gap-8 px-6 py-3 border-t border-gray-700">
      <Link to={'/'} className="flex flex-col items-center text-white flex-1">
        <IoHome className="w-7 h-7 mb-1"/>
        <span className="text-xs">home</span>
      </Link>
      <button onClick={handleProfileClick} className="flex flex-col items-center text-white flex-1">
        <IoPerson className="w-7 h-7 mb-1"/>
        <span className="text-xs">profile</span>
      </button>
      <Link to={'/save'} className="flex flex-col items-center text-white flex-1">
        <FaRegBookmark className="w-7 h-7 mb-1"/>
        <span className="text-xs">saved</span>
      </Link>
    </div>
  )
}

export default BottomNavigation
