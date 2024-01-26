import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';



interface ModalProps {
  isOpen: boolean;
  isSaved:boolean;
  loading:boolean;
  onRequestClose: () => void;
  onSave: (name: string) => void;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, onSave, isSaved, loading }) => {
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
              {!isSaved ? 
                (
                  <>
                    <button
                    onClick={handleSave}
                    className='bg-green-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600'
                 >
                    Save
                 </button>
                 {loading && (
                    <CircularProgress
                      size={68}
                      sx={{
                        color: green,
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        zIndex: 1,
                      }}
                    />
        )}
                <button
                    onClick={onRequestClose}
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-600'
                    >
                    Close
                </button>
                  </>
                )
              :  
              <Link  className='bg-green-500 text-white px-4 py-2 rounded hover:bg-gray-600' href={"/teams"}>
              Look your Team
              </Link>
              }
            </div>
    </div>
      </Modal>
    </>
  );
};

export default CustomModal;
