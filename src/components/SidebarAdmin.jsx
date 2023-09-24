// import React from 'react'
import { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown, MdSkipPrevious, MdAccountBalance } from "react-icons/md";
import { Link } from "react-router-dom";

export default function SidebarAdmin() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <>
      <header className="side_bar">
        <div className="dash-title">
          <MdAccountBalance />
          <span className="content">IELTSimulatExam</span>
        </div>

        {/* index dashboard */}
        <Link to={"/admin/dashboard/index"}><FaHome /><strong>Dashboard</strong></Link>

        {/* <!-- user menu --> */}
        {/* Dropdown toggle button */}
        <button
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="User Tools"
          onClick={handleToggleDropdown}
        >
          <span className="content">
            <FaUser />
            <strong>Users</strong>
          </span>
          <MdOutlineKeyboardArrowDown />
        </button>

        {/* Dropdown content */}
        {isDropdownOpen && (
          <div className="dropdown-content">
            {/* Add your dropdown menu items here */}
            <Link to={"/admin/dashboard/users"}>All Users</Link>
            <Link to={"/admin/dashboard/addusers"}>Add User</Link>
            {/* Add more menu items as needed */}
          </div>
        )}

        <Link to={"/home"}><MdSkipPrevious />
          <strong>Back To Site</strong>
        </Link>
      </header>
    </>
  )
}
