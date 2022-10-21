import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, Redirect } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <button>
      <NavLink to={'/spots/createspot'}>become a host</NavLink>
    </button>
      <button onClick={openMenu} className='navbar-right'>
        <i class="fa-solid fa-bars"></i>
        <i class="fa-regular fa-user"></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>
            <button >
                <NavLink to = {'/account'}>
                  Account
                </NavLink>
              </button>
          </div>
          <div>
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
