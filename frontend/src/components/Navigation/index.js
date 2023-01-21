import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import React, { useState, useEffect } from "react";
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm.js'
import SignupFormPage from '../SignupFormPage/SignupForm.js'
import { searchthunk } from '../../store/search';
import './index.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSignupModal,setshowSignupModal] = useState(false)
  const [searchterm,setSearchTerm] = useState("")
  const [searchbox,setSearchBox] = useState(false)
  const [searchcontainer,setSearchContainer] = useState(false)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const updateterm = (e) =>{
    setSearchTerm(e.target.value);
    // console.log(searchterm, 'this is searchte.rm')
    return
  }

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

  useEffect(() =>{
    if(searchterm =='' ||searchterm ==' '){
      setSearchContainer(false)
      return
    }
    if(searchterm){
      async function getmydata (){
      const result = await dispatch(searchthunk(searchterm))
      // console.log(result, 'this is result')
      // console.log(searchterm)
      if(result){
      // let array = result.search_result
      setSearchBox(result)
      setSearchContainer(true)
      // console.log(result , 'this is the result')
      // console.log(searchbox,"<<<<<this is searchbox")
      return
        }
      }
      getmydata()
      setSearchBox(false)

      return
    }

  },[searchterm,dispatch])

  useEffect (() => {
    const closesearchbar = () => {
      setSearchContainer(false)
      // setSearchTerm('')
    }
    document.addEventListener('click', closesearchbar);
    return () => document.removeEventListener("click", closesearchbar);

  },[searchcontainer])

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
        <div className='searchbar'>
            <form>
              <label className='searchbar1'>
                <input className = 'search_input_container' placeholder={'Search by Name or City...'} type='search' value={searchterm} onChange={updateterm}>
                </input>
                {/* <button ><i class="fa-solid fa-magnifying-glass"></i></button> */}
              </label>
            </form>
            {searchcontainer?
            <div className='searchcontainer'>
              {searchterm && searchcontainer &&
                <div >
                  {searchbox.length>0?<div className='search_name'>{searchbox?.map((spotinfo)=>(
                  <NavLink key={spotinfo.id} to={`/spots/${spotinfo?.id}`} className='search_name_individual'>
                    <div className='namexxx'>{spotinfo?.name}</div><div className='namexxx'>{spotinfo?.city},{spotinfo?.state}</div></NavLink>
                    ))}
                  </div>:
                  <div className='search_name_noresult'>no result found!</div>
                  }
                </div>
              }
            </div>:null}
          </div>
        {isLoaded && sessionLinks}
      </div>
    <div className='emptyline-new'></div>
    </>
  );
}


export default Navigation;
