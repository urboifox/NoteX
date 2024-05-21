import { cn } from "@/helpers/cn";
import { forwardRef } from "react";

type ButtonProps = {
    children: React.ReactNode,
    className?: string,
    type?: "button" | "submit" | "reset",
    disabled?: boolean,
    active?: boolean
} & React.HTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({children, className, type = "button", active = false, disabled = false, ...props}, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      {...props}
      disabled={disabled}
      className={cn(
        "border gap-2 bg-white/10 border-white/10 transition-colors duration-200 sm:hover:bg-white/15 p-2 flex items-center justify-center rounded-md",
        active ? "bg-white text-black sm:hover:bg-white/80 sm:hover:text-black/80" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
    >
      {children}
    </button>
  );
})

Button.displayName = "Button"
export default Button;

