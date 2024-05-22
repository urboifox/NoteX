'use client';
import icons from "@/lib/icons";
import Button from "../common/Button";
import Checkbox from "../common/Checkbox";
import { cn } from "@/helpers/cn";
import Skeleton from "react-loading-skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

type TodoItemProps = {
    todo: TodoResponse;
    onDelete?: (todo: TodoResponse) => void;
    onClick?: (todo: TodoResponse) => void;
    onTagChange?: (todo: TodoResponse,tag: TagResponse) => void;
    loading?: boolean;
    archived?: boolean;
    tags?: TagResponse[];
};

export default function TodoItem({ todo, loading, tags, archived, onDelete, onClick, onTagChange }: TodoItemProps) {

    const [visible, setVisible] = useState(false);
    const tagButton = useRef<HTMLButtonElement>(null);

    useOutsideClick({
        ref: tagButton,
        handler: () => setVisible(false)
    })

    return (
        <div onMouseLeave={() => setVisible(false)} className="group relative w-full rounded-md sm:hover:bg-white/5 p-2 border border-white/10 transition-colors duration-200 sm:hover:border-white/20 flex items-center justify-between">
            <label htmlFor={todo._id} className={cn("flex gap-2 items-center transition-all duration-200", todo.completed && "opacity-50", !archived && "cursor-pointer")}>
                <Checkbox id={todo._id} disabled={archived || loading} onClick={() => onClick && !archived && onClick(todo)} checked={todo.completed} className="p-0 bg-none" />
                <p className={cn("select-none", todo.completed && "line-through")}>{todo.title || <Skeleton width={Math.floor(Math.random() * 100) + 100} />}</p>
            </label>
            <div className="flex items-center gap-3">
                <div>
                    <AnimatePresence>
                        {
                            visible && !archived && (
                                <motion.ul initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} exit={{ opacity: 0, scaleY: 0, transition: {delay: .3} }} className="absolute origin-bottom overflow-hidden flex flex-wrap max-w-full w-64 gap-2 z-40 bottom-10 bg-white/10 p-2 backdrop-blur-sm rounded-md right-0 flex-row-reverse">
                                    {
                                        tags?.map((tag, i) => {
                                            return <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1, transition: {delay: .3} }} exit={{ opacity: 0 }} onClick={() => onTagChange && onTagChange(todo, tag)} key={i} className={cn("text-xs select-none rounded-md text-center border cursor-pointer p-1 transition-colors duration-200 hover:bg-white/10")} style={{ borderColor: tag.color, color: tag.color }}>{tag.name}</motion.li>
                                        })
                                    }
                                </motion.ul>
                            )
                        }
                    </AnimatePresence>
                    {
                        todo.tag?.name ? (
                            <span ref={tagButton} onClick={() => !archived && setVisible(!visible)} style={{ borderColor: todo.tag?.color, color: todo.tag?.color }} className={cn("text-xs select-none rounded-md border p-1", !archived && "cursor-pointer")}>
                                {todo.tag?.name}
                            </span>
                        ) : (
                            <Skeleton width={60} />
                        )
                    }
                </div>
                <Button onClick={() => onDelete && onDelete(todo)} className="text-xs text-red-600 opacity-50 group-hover:opacity-100 transition-opacity duration-200">{icons.trash}</Button>
            </div>
        </div>
    );
}
