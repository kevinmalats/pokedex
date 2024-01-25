import React, { useState } from 'react';
import Modal from '@mui/material/Modal';




interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (name: string) => void;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, onSave }) => {
  const [name, setName] = useState<string>('');

  const handleSave = () => {
    onSave(name);
    setName("")
    
  };

  return (
    <>
        <Modal
        open={isOpen}
        onClose={onRequestClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='w-2/3 bg-white h-2/3 py-60 m-auto mt-20 p-4 text-center'>
            <h2 className='text-xl mb-4'>For save your team, you need writte your name</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Writte your firstname and lastname"
                className='w-60 p-2 mb-4 border-2 border-black rounded shadow-sm'
            />
            <div>
                <button
                    onClick={handleSave}
                    className='bg-green-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600'
                 >
                    Save
                 </button>
                <button
                    onClick={onRequestClose}
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-600'
                    >
                    Close
                </button>
            </div>
    </div>
      </Modal>
    </>
  );
};

export default CustomModal;
