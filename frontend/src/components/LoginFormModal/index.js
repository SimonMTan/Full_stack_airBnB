import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './index.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='loginbutton' onClick={() => (setShowModal(true))}>Log In</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
