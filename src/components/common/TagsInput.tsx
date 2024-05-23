import { useEffect, useRef, useState } from 'react';
import icons from '@/lib/icons';
import { cn } from '@/helpers/cn';

type InputProps = {
    label?: string;
    icon?: React.ReactNode;
    error?: string;
    className?: string;
    tags: string[];
    onAddition: (tag: string) => void;
    onDelete?: (tag: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function TagsInput({label, tags = [], className, error,icon, onDelete, onAddition, ...props}: InputProps) {

  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && document.activeElement === inputRef.current && value) {
        onAddition(value);
        setValue('');
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onAddition, value]);

  return (
    <div className={className || ""}>
        {label && <label htmlFor={props.name} className={cn('font-medium', props.required && "")}>{label}</label>}

        <div className={`mt-2`}>
          <input
            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            ref={inputRef}
            value={value}
            onChange={(e) => {setValue(e.target.value)}}
            type='text'
            className={cn('focus:outline-none w-full focus:border-white/40 transition-colors duration-200 text-white bg-white/10 border border-white/10 placeholder:text-white/50 p-2 rounded-md', error && "border-red-500")}
            {...props}
          />

          { icon && <span className={`cursor-pointer absolute top-1/2 right-3 -translate-y-1/2 h-5 w-5 flex items-center justify-center`}>{icon}</span> }
        </div>

        {error && <small className={`text-red-500 flex items-center mt-2 gap-1`}>{icons.infoCircle}{typeof error === 'string' ? error : error[0]}</small>}

        {
            tags.length > 0 && (
                <div className={`flex mt-2 items-center gap-1 flex-wrap`}>
                    {
                        tags.map((tag, i) => {
                            return (
                                <div key={i} onClick={() => onDelete?.(tag)} className='text-sm rounded-md text-center border border-white/40 cursor-pointer p-1 transition-colors duration-200 hover:bg-white/10'>
                                    {tag}
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    </div>
  )
}