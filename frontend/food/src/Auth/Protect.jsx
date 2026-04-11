import React from 'react'
import { useSelector } from 'react-redux';
import Home from '../Pages/Home';
import Login from "../Auth/UserLogin"
import { Navigate, Outlet } from 'react-router-dom';
import { useGetProfileQuery } from '../features/api/AuthApi';

const Protect = () => {

    const { data: profile } = useGetProfileQuery();

    const { isAuthenticated } = useSelector((state) => state.auth);

    return profile || isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

}

export default Protect
