import { useState } from 'react';
import Modal from '../components/Modal';
import { createPortal } from 'react-dom';

export default function Example() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="ml-10 rounded-md bg-teal-400 p-4 text-stone-200"
      >
        Open
      </button>
      {showModal &&
        createPortal(
          <Modal onClose={() => setShowModal(false)} />,
          document.body
        )}
    </>
  );
}
