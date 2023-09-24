import { useState, useEffect, useRef } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextsProvider";
import axiosClient from "../axios-client";

const Userinfo = () => {
  const [showUserList, setShowUserList] = useState(false);
  const { user, token, setUser, setToken } = useStateContext();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleUserList = () => {
    setShowUserList((prevShowUserList) => !prevShowUserList);
  };

  const hideDropdown = () => {
    setShowUserList(false);
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

  useEffect(() => {

    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        hideDropdown();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  return (
    <div className="userinfo" ref={containerRef}>
      <img src="/image/user.png" alt="User" />
      <div className="userlist">
        <span>Welcome</span>
        <button type="button" onClick={handleUserList}>
          {token ? `${user.first_name} ${user.last_name}` : "User Name"}
          <RiArrowDownSFill />
        </button>
      </div>
      {showUserList && (
        <ul className="admin-list">
          {!token ? (
            <li>
              <Link to="/login" onClick={hideDropdown}>
                Login
              </Link>
            </li>
          ) : (
            <li>
              <div className="toggle-Menu">
                <Link to={'/profile'}>Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Userinfo;
