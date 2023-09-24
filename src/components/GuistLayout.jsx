// import React from 'react'
import { Outlet } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import { useEffect } from 'react';
import { useStateContext } from "../contexts/ContextsProvider";
import axiosClient from '../axios-client';

export default function GuistLayout() {

  const { setUser } = useStateContext()

  useEffect(() => {
    fetchUserData();
  },[]);

  const fetchUserData = async () => {
    try {
      const response = await axiosClient.get("/user");
      setUser(response.data);
    } catch (error) {
      // Handle error gracefully
      console.error("Error fetching user data:", error);
    }
  };

    return (
      <>
        <SiteHeader />
        <Outlet />
        <Footer />
      </>
  )
}

