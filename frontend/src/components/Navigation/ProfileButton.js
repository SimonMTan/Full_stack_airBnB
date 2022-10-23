import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, Redirect, useHistory} from "react-router-dom";
import './navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenux, setShowMenu] = useState(false);
  const history = useHistory()

  const toggleMenu = () => {
    // if (showMenu) return;
    setShowMenu(!showMenux);
  };

  useEffect(() => {
    if (!showMenux) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenux]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
    <div className='nav-wrapper-login'>
    <div className='navbar-right-left'>
      <NavLink to={'/spots/createspot'}><div className="createspot">Become a Host</div></NavLink>
    </div>
      <button onClick={toggleMenu} className='navbar-right-new'>
        <i className="fa-solid fa-bars"></i>
        <i className="fa-regular fa-user"></i>
      </button>
      {showMenux && (
        <div className="profile-dropdown">
          <div className="profile-dropdownchild">{user.username}</div>
          <div className="profile-dropdownchild">{user.email}</div>
          <div>
            <div className="profile-dropdownchild">
                <NavLink to = {'/account'}>
                  <div className="clickable">Account</div>
                </NavLink>
              </div>
          </div>
          <div className="profile-dropdownchild">
            <div className='clickable'onClick={logout}>Log Out</div>
          </div>
        </div>
       )}
      </div>
    </>
  );
}

export default ProfileButton;
