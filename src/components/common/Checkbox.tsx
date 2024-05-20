'use client';

import { cn } from "@/helpers/cn";
import icons from "@/lib/icons";
import { useEffect, useState } from "react";

type CheckboxProps = {
    label?: string;
    icon?: React.ReactNode;
    error?: string|string[];
    className?: string;
    inputClassName?: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox({label, className, checked, onChange, inputClassName, error, icon, type = "text", disabled, ...props}: CheckboxProps) {

    const [isChecked, setIsChecked] = useState(checked || false);

    useEffect(() => {
        setIsChecked(checked || false);
    }, [checked]);
    
    return (
        <label
            htmlFor={props.id || props.name}
            className={cn(
                "flex p-2 border border-white/10 bg-white/10 w-max rounded-md items-center cursor-pointer gap-2",
                disabled ? "opacity-50 cursor-not-allowed" : "",
                className
            )}
        >
            <input
                id={props.id || props.name}
                onChange={(e) => {
                    if (!disabled) {
                        setIsChecked(e.target.checked);
                        onChange && onChange(e);
                    }
                }}
                hidden
                checked={isChecked}
                type="checkbox"
                {...props}
            />
            <div
                className={cn(
                    "relative w-4 text-sm h-4 border border-white/20 rounded-sm transition-colors duration-100",
                    isChecked ? "bg-white text-black" : "text-transparent",
                    inputClassName
                )}
            >
                {icons.check}
            </div>
            {label && <p className="select-none">{label}</p>}
        </label>
    );
}