import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupForm';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return(
        <>
    <div onClick={() => setShowModal(true)}>Sign up</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
        </>
    )
}

export default SignupFormModal
