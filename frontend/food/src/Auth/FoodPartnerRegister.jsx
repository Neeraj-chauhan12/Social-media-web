import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../utiles/utiles';


const FoodPartnerRegister = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFullName("")
    setEmail("")
    setPassword("")
    setContactName("")
    setPhone("")
    setAddress("")

    const newPartner = { fullName, email, password, contactName, phone, address };
    

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/partner/register`, newPartner,{
        withCredentials:true

      });
     
      toast.success(response.data.message);
      navigate("/Create") // Redirect to login after successful registration
    } catch (error) {
      console.error("Food Partner Register Error:", error);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    }

    // Replace with API call
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="mb-4">
          <h1 className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-2">Food App</h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Food Partner Register</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Contact Name" value={contactName} onChange={e => setContactName(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="w-full py-2 rounded bg-blue-600 text-white dark:bg-blue-500 dark:text-white font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">Register</button>
        </form>
        <div className="flex flex-col gap-2 mt-6 text-center">
          <Link to="/partner/login" className="text-blue-600 dark:text-blue-400 hover:underline">Already a partner? Login</Link>
          <Link to="/user/register" className="text-blue-600 dark:text-blue-400 hover:underline">Register as User</Link>
          </div>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
