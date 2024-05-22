'use client';
import icons from "@/lib/icons";
import Button from "../common/Button";
import Checkbox from "../common/Checkbox";
import { cn } from "@/helpers/cn";
import Skeleton from "react-loading-skeleton";

type TodoItemProps = {
    todo: TodoResponse;
    onDelete?: (todo: TodoResponse) => void;
    onClick?: (todo: TodoResponse) => void;
    loading?: boolean;
    archived?: boolean;
};

export default function TodoItem({ todo, loading, archived, onDelete, onClick }: TodoItemProps) {
    return (
        <label htmlFor={todo._id} className="group w-full rounded-md cursor-pointer sm:hover:bg-white/5 p-2 border border-white/10 transition-colors duration-200 sm:hover:border-white/20 flex items-center justify-between">
            <div className={cn("flex gap-2 items-center transition-all duration-200", todo.completed && "opacity-50")}>
                <Checkbox id={todo._id} disabled={archived || loading} onClick={() => onClick && !archived && onClick(todo)} checked={todo.completed} className="p-0 bg-none" />
                <p className={cn("select-none", todo.completed && "line-through")}>{todo.title || <Skeleton width={Math.floor(Math.random() * 100) + 100} />}</p>
            </div>
            <div className="sm:opacity-50 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-3">
                <Button onClick={() => onDelete && onDelete(todo)} className="text-xs text-red-600">{icons.trash}</Button>
            </div>
        </label>
    );
}
