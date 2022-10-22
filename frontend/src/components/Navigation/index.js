import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage';
import React, { useState, useEffect } from "react";
import './index.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
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

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div>
          <div className='navbar-right-left'>
            <NavLink to={'/spots/createspot'}>become a host</NavLink>
          </div>
          <button onClick={openMenu} className='navbar-right'>
            <i class="fa-solid fa-bars"></i>
            <i class="fa-regular fa-user"></i>
          </button>
          {showMenu && (
          <div className="profile-dropdown">
            <div className='login'>
              <LoginFormModal />
            </div>
            <div className='signup'>
              <SignupFormModal />
            </div>
          </div>
           )}
          </div>
      </>
    );
  }

  return (
    <>
      <div className='nav-wrapper'>
        <NavLink exact to="/">
            <img className='logo'src={'https://drive.google.com/uc?export=view&id=12nkWGXtZZWaTe55y8KCxkm6X7KwDnPJB'}></img>
        </NavLink>
        {isLoaded && sessionLinks}
      </div>
    <div className='emptyline'></div>
    </>
  );
}


export default Navigation;
