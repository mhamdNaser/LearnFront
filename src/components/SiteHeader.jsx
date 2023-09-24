import { useState } from 'react';
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import Userinfo from './Userinformation';
import { useStateContext } from '../contexts/ContextsProvider';
import { Link } from 'react-router-dom';

export default function SiteHeader() {

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { token } = useStateContext();

  const handleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleToggleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          <div className="mobile-list">
            {/* Place your dropdown content here */}
            <Link to={'/home'}>Home</Link>
            <Link to={'/about'}>About us</Link>
            {token &&
              <>
                <Link to={'/contact'}>Contacts</Link>
                <Link to={'/indexexam'}>Exam Page</Link>
              </>
            }
            <button onClick={handleSearch}>
              <AiOutlineSearch />
            </button>
            {isSearchVisible && (
              <div className="search-bar">
                <input type="text" placeholder="Search..." />
              </div>
            )}
          </div>
        )}
      </div>
    </header >
  )
}
