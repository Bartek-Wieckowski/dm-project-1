import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import useClickOutside from "../hooks/useClickOutside";
import Button from "../components/Button";

type ModalContextProps = {
  openName: string;
  close: () => void;
  open: (name: string) => void;
};

type ModalProps = {
  children: React.ReactNode;
};

type OpenProps = {
  children: React.ReactElement;
  opensWindowName: string;
};

type WindowProps = {
  children: React.ReactNode;
  name: string;
  clickOk?: () => void;
  showButtonOk?: boolean;
};

const ModalContext = createContext<ModalContextProps | null>(null);

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");

  function close() {
    setOpenName("");
  }
  function open(name: string) {
    setOpenName(name);
  }

  return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>;
}

function Open({ children, opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext)!;

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name, clickOk, showButtonOk }: WindowProps) {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    return null;
  }

  const { openName, close } = modalContext;
  const ref = useClickOutside(close);

  if (name !== openName) return null;

  const handleClickOk = () => {
    if (clickOk) {
      clickOk();
    }
    close();
  };

  return createPortal(
    <div className={styledOverlay}>
      <div ref={ref} className={styledModal}>
        {children}
        {showButtonOk && (
          <Button onClick={handleClickOk} btnStyles="btnDelete">
            OK
          </Button>
        )}
        <Button onClick={close} btnStyles="btnCancel">
          Zamknij
        </Button>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

const styledModal =
  "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-lg shadow-lg p-8 transition-all duration-500 text-center";
const styledOverlay =
  "fixed top-0 left-0 w-full h-screen bg-backdrop-color backdrop-filter backdrop-blur-sm z-1000 transition-all duration-500";
