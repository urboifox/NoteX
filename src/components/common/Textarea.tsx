import { cn } from '@/helpers/cn';
import icons from '@/lib/icons';

type InputProps = {
    label?: string;
    icon?: React.ReactNode;
    error?: string;
    className?: string;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({label, className, error, icon, ...props}: InputProps) {
  return (
    <div className={cn("relative flex-1 w-full flex flex-col gap-2", className)}>
        {label && <label htmlFor={props.name} className={`font-medium`}>{label}</label>}

        <div className={cn("flex flex-col gap-2")}>
          <textarea maxLength={props.maxLength} className={cn(`focus:outline-none focus:border-white/40 transition-colors duration-200 text-white bg-white/10 border border-white/10 placeholder:text-white/50 p-2 rounded-md min-h-20 ${error ? "border-red-500" : ''}`, error ? "border-red-500" : "")} {...props} />
          { icon && <span className="absolute top-2 right-2">{icon}</span> }
        </div>

        {error && <small className={cn("text-red-500 flex items-center gap-1")}>{icons.infoCircle}{typeof error === 'string' ? error : error[0]}</small>}
    </div>
  )
}

