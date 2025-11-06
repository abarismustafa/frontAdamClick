import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../components/profile/Profile";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";

function ProfilePage() {
  const isLogin = window.localStorage.getItem('isLogin')
  const navigate = useNavigate()
  useEffect(() => {
    if (isLogin === 'false') {
      navigate('/login')
      return
    }
  }, [])
  return (
    <>
      {/* <Breadcrumb title="Profile" /> */}
      <Profile />
    </>
  );
}

export default ProfilePage;
