'use client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
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
  const ref = useRef<HTMLDivElement>(null);
  const { isVisible, setIsVisible } = useContext(ModalContext);

  useEffect(() => {
    if (isVisible) {
      const handleClickOutside = (e: MouseEvent) => {
        console.log('first');
        if (ref.current && !ref.current.contains(e.target as Node)) {
          console.log('first2');
          setIsVisible(false);
        }
      };
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setIsVisible(false);
        }
      });
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isVisible]);

  return (
    <div
      className={cn(
        isVisible ? 'flex' : 'hidden',
        'fixed z-50 inset-0 bg-black/50 backdrop-blur-sm  items-center justify-center'
      )}
    >
      <div
        ref={ref}
        className='bg-white rounded-lg px-4 pt-8 pb-4  h-[200px] shadow-md flex flex-col justify-between relative'
      >
        <X
          role='button'
          tabIndex={0}
          onKeyDown={(v) => v.key === 'Enter' && setIsVisible(false)}
          onClick={() => setIsVisible(false)}
          className='absolute right-2 top-2 cursor-pointer'
        />
        {children}
        <div className='flex gap-4 justify-end'>
          <Button
            handleClick={handleConfirm}
            variant='secondary'
            classNameCustome='bg-red-500 hover:bg-red-600 px-4'
          >
            Delete
          </Button>

          <Button
            handleClick={() => setIsVisible(false)}
            classNameCustome='px-8'
          >
            Cancel
          </Button>
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
