import { useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import Userinfo from './Userinformation';
import { useStateContext } from '../contexts/ContextsProvider';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';

export default function SiteHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, token, setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const handleToggleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axiosClient.post("/logout");
      setUser({});
      setToken(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="header-area sticky-top">
      <div className='logo'>
        <img src="/image/logo.png" alt="test" />
      </div>
      <div className="center-component">
        <Link to={'/home'}>Home</Link>
        <Link to={'/about'}>About us</Link>
        {token &&
          <>
            <Link to={'/contact'}>Contacts</Link>
            <Link to={'/indexexam'}>Exam Page</Link>
            <Link to={'/Appointment'}>Appointment Booking</Link>
          </>
        }
      </div>
      <div className="right-component">
        <Userinfo />
        <button className="dropdown" onClick={handleToggleClick}>
          <AiOutlineMenu />
        </button>
        {isDropdownOpen && (
          <div className="mobile-list p-3">
            <img src="/image/user.png" alt="User" style={{ width: "45px", margin: "0 auto" }} />

            {token && <Link to={'/profile'}>
              {user.first_name} {user.last_name} <br />
              {user.email}
            </Link>}
            <hr />
            <Link to={'/home'}>Home</Link>
            <Link to={'/about'}>About us</Link>
            {token &&
              <>
                <Link to={'/contact'}>Contacts</Link>
                <Link to={'/indexexam'}>Exam Page</Link>
                <Link to={'/Appointment'}>Appointment Booking</Link>
              </>
            }
            <hr />
            <button onClick={handleLogout} style={{ backgroundColor: "inherit", border: "none" }}>Logout</button>
          </div>
        )}
      </div>
    </header >
  )
}
