import useClickOutside from '../hooks/useClickOutside';

type ModalProps = {
  onClose: () => void;
};

export default function Modal({ onClose }: ModalProps) {
  const ref = useClickOutside(onClose);

  return (
    <div
      ref={ref}
      className="absolute inset-y-[70px] left-1/2 box-border flex size-[250px] -translate-x-1/2 items-center justify-evenly rounded-lg border-2 border-gray-300 bg-white shadow-md"
    >
      <div>Click outside!</div>
    </div>
  );
}
