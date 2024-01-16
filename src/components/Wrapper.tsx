import { WrapperProps } from '../types/WrapperProps.type';
export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="flex w-full flex-col flex-wrap gap-4 sm:flex-row">
      {children}
    </div>
  );
}
