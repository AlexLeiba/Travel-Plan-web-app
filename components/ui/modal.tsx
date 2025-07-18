'use client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Button } from './button';
import { cn } from '@/lib/utilities';
import { X } from 'lucide-react';
type Props = {
  children: React.ReactNode;
};

type ModalContextType = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextType>({
  isVisible: false,
  setIsVisible: () => {},
});

// MODAL PROVIDER
export function ModalProvider({ children }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ModalContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </ModalContext.Provider>
  );
}

// MODAL CONTENT
type ModalContentProps = {
  children: React.ReactNode;
  handleConfirm: () => void;
};
export function ModalContent({ children, handleConfirm }: ModalContentProps) {
  const { isVisible, setIsVisible } = useContext(ModalContext);

  return (
    <div
      className={cn(
        isVisible ? 'flex' : 'hidden',
        'fixed z-50 inset-0 bg-black/50 backdrop-blur-sm  items-center justify-center'
      )}
    >
      <div className='bg-white rounded-lg px-4 py-8  h-[200px] shadow-md flex flex-col justify-between relative'>
        <X
          onClick={() => setIsVisible(false)}
          className='absolute right-2 top-2 cursor-pointer'
        />
        {children}
        <div className='flex gap-4 justify-end'>
          <Button
            handleClick={handleConfirm}
            variant='secondary'
            classNameCustome='bg-red-500 hover:bg-red-600'
          >
            Delete
          </Button>

          <Button handleClick={() => setIsVisible(false)}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

// MODAL TRIGGER
type ModalTriggerProps = {
  children: React.ReactNode;
  customeClassName?: string;
};
export function ModalTrigger({
  children,
  customeClassName,
}: ModalTriggerProps) {
  const { setIsVisible } = useContext(ModalContext);
  return (
    <div className={`${customeClassName}`} onClick={() => setIsVisible(true)}>
      {children}
    </div>
  );
}
