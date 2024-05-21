'use client';
import { TodosAtom } from "@/recoil/atoms/TodosAtom"
import { useRecoilValue } from "recoil"

export default function TodosProgress() {

    const todos = useRecoilValue(TodosAtom);
    const completed = todos.filter((todo) => todo.completed).length
    
    return (
        <div>
            {completed}/{todos.length}
        </div>
    )
}
