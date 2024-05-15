'use client';
import { HTMLInputTypeAttribute, useState } from 'react';
import icons from '@/lib/icons';
import { cn } from '@/lib/cn';

type InputProps = {
    label?: string;
    icon?: React.ReactNode;
    error?: string|string[];
    type?: HTMLInputTypeAttribute;
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({label, className, error, icon, type = "text", ...props}: InputProps) {
  const [inputType, setInputType] = useState(type);
  const toggleType = () => setInputType(prev => prev === 'password' ? 'text' : 'password');

  return (
    <div className={cn("relative flex-1 flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={props.name} className={`font-medium`}>
          {label}
        </label>
      )}

      <div className="relative text-white/80 flex items-center">
        <input
          type={inputType}
          className={cn(
            `focus:outline-none w-full focus:border-white/40 transition-colors duration-200 text-white bg-white/10 border border-white/10 placeholder:text-white/50 p-2 rounded-md`,
            error ? "border-red-500" : ""
          )}
          {...props}
        />
        {type === "password" ? (
          <span
            onClick={toggleType}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {inputType === "password" ? icons.eyeSlash : icons.eye}
          </span>
        ) : (
          icon && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
              {icon}
            </span>
          )
        )}
      </div>

      {error && (
        <small className={"text-red-500 flex items-center gap-1"}>
          {icons.infoCircle}
          {typeof error === "string" ? error : error[0]}
        </small>
      )}
    </div>
  );
}