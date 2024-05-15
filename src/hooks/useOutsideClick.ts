import { useEffect } from 'react';

interface OutsideClickProps {
  ref: React.RefObject<HTMLElement>;
  handler: () => void;
}

const useOutsideClick = ({ ref, handler }: OutsideClickProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOutsideClick;