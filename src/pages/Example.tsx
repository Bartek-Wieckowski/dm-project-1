import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../components/Modal";
import Button from "../components/Button";

export default function Example() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button type="button" onClick={() => setShowModal(true)} btnStyles="btnSimple">
        Open
      </Button>
      {showModal && createPortal(<Modal onClose={() => setShowModal(false)} />, document.body)}
    </>
  );
}
