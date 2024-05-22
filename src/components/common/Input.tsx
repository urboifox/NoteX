'use client';
import { HTMLInputTypeAttribute, forwardRef, useState } from 'react';
import icons from '@/lib/icons';
import { cn } from '@/helpers/cn';

type InputProps = {
    label?: string;
    icon?: React.ReactNode;
    error?: string|string[];
    type?: HTMLInputTypeAttribute;
    className?: string;
    required?: boolean;
    inputClassName?: string;
    disabled?: boolean;
    hideErrorTitle?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({label, hideErrorTitle, className, inputClassName, required, error, icon, type = "text", disabled, ...props}: InputProps, ref) => {
  const [inputType, setInputType] = useState(type);
  const toggleType = () => setInputType(prev => prev === 'password' ? 'text' : 'password');

  return (
    <div className={cn("relative flex flex-col gap-2", disabled ? "cursor-not-allowed opacity-50" : "" ,className)}>
      {label && (
        <label htmlFor={props.name} className={`font-medium w-max relative`}>
          {label}
          {
            required && (
              <span className="absolute -right-3 font-bold -top-1 text-red-500">*</span>
            )
          }
        </label>
      )}

      <div className={cn("relative text-white/80 flex items-center")}>
        <input
          ref={ref}
          type={inputType}
          disabled={disabled}
          className={cn(
            `focus:outline-none w-full focus:border-white/40 transition-colors duration-200 text-white bg-white/10 border border-white/10 placeholder:text-white/50 p-2 rounded-md`,
            error ? "border-red-500" : "",
            disabled ? "cursor-not-allowed" : "",
            inputClassName
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

      {error && !hideErrorTitle && (
        <small className={"text-red-500 flex items-center gap-1"}>
          {icons.infoCircle}
          {typeof error === "string" ? error : error[0]}
        </small>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;