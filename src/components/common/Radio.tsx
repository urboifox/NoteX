type RadioProps = {
    label?: string;
    icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Radio({ label, icon, ...props }: RadioProps) {
    return (
        <label htmlFor={props.id || label} className="flex cursor-pointer items-center gap-2 p-2 bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/10 hover:border-white/50 rounded-md">
            <input
                className={`appearance-none relative m-0 w-4 h-4 border border-white/20 checked:border-white/50 rounded-full transition-all duration-200 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:w-2 after:h-2 after:-translate-y-1/2 after:-translate-x-1/2 after:transition-opacity after:duration-200 after:opacity-0 checked:after:opacity-100 after:rounded-full after:bg-white`}
                id={props.id || label}
                type="radio"
                {...props}
            />
            {label && <span className="select-none flex items-center gap-1">{icon && icon} {label}</span>}
        </label>
    );
}
