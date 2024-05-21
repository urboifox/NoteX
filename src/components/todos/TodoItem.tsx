import icons from "@/lib/icons";
import Button from "../common/Button";
import Checkbox from "../common/Checkbox";
import { cn } from "@/helpers/cn";

type TodoItemProps = {
    todo: TodoResponse;
    onDelete: (todo: TodoResponse) => void;
    onClick: (todo: TodoResponse) => void;
};

export default function TodoItem({ todo, onDelete, onClick }: TodoItemProps) {
    return (
        <label htmlFor={todo._id} className="group w-full rounded-md cursor-pointer hover:bg-white/5 p-2 border border-white/10 transition-colors duration-200 hover:border-white/20 flex items-center justify-between">
            <div className={cn("flex gap-2 items-center transition-all duration-200", todo.completed && "opacity-50")}>
                <Checkbox id={todo._id} onClick={() => onClick(todo)} checked={todo.completed} className="p-0 bg-none" />
                <p className={cn("select-none", todo.completed && "line-through")}>{todo.title}</p>
            </div>
            <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-3">
                <Button onClick={() => onDelete(todo)} className="text-xs text-red-600">{icons.trash}</Button>
            </div>
        </label>
    );
}
