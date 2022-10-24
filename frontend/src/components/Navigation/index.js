import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import React, { useState, useEffect } from "react";
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm.js'
import SignupFormPage from '../SignupFormPage/SignupForm.js'
import './index.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSignupModal,setshowSignupModal] = useState(false)
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    // if (!showModal) return;
    // if (!showSignupModal) return

    const closeMenu = () => {
      setShowMenu(false);
      // setShowModal(false)
      // setshowSignupModal(false)
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu)

  }, [showMenu]);

  // useEffect(() => {
  //   console.log('this is showModal >>>',showModal)
  //   console.log('this is showSignModal >>>',showSignupModal)
  // },[showModal,showSignupModal])

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} setShowModal={setShowModal} setshowSignupModal={setshowSignupModal} />
    );
  } else {
    sessionLinks = (
      <>
        <div>

          <button onClick={openMenu} className='navbar-right-new'>
            <i className="fa-solid fa-bars"></i>
            <i className="fa-regular fa-user"></i>
          </button>

          {showMenu && (
          <div className="profile-dropdown-new">
            <div className='login-new' onClick={() => (setShowModal(true))}>Log In</div>
            <div className='signup-new' onClick={() => (setshowSignupModal(true))}>Signup!</div>
          </div>
          )}
          </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}

      {showSignupModal && (
        <Modal onClose={() => setshowSignupModal(false)}>
          <SignupFormPage />
        </Modal>

      )}
      </>
    );
  }

  return (
    <>
      <div className='nav-wrapper-new'>
        <NavLink exact to="/">
            <img className='logo'src={'https://drive.google.com/uc?export=view&id=12nkWGXtZZWaTe55y8KCxkm6X7KwDnPJB'}></img>
        </NavLink>
        {isLoaded && sessionLinks}
      </div>
    <div className='emptyline-new'></div>
    </>
  );
}


export default Navigation;
