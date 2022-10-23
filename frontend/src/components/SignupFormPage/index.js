import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupForm';
import './index.css'

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return(
        <>
    {/* <div className='signupbutton' onClick={(e) => (setShowModal(true))}>Sign up</div> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
        </>
    )
}

export default SignupFormModal
