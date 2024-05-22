"use client";
import { useState } from "react";
import Modal from "../common/Modal";
import TodoItem from "./TodoItem";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import NoResult from "../common/NoResult";

export default function ArchivedTodosContent({
    todos,
}: {
    todos: TodoResponse[];
}) {
    const [selectedTodo, setSelectedTodo] = useState<TodoResponse | null>(null);
    const router = useRouter();

    function handleDeleteTodo() {
        fetch(`/api/todos?todoId=${selectedTodo?._id}`, {
            method: "DELETE",
        }).then(() => {
            toast.success(`Todo Deleted`);
            router.refresh();
        });

        setSelectedTodo(null);
    }

    return (
        <div className="flex flex-col gap-3">
            <Modal
                onCancel={() => setSelectedTodo(null)}
                visible={!!selectedTodo}
                text={`Delete ${selectedTodo?.title}`}
                onSubmit={handleDeleteTodo}
            />
            {todos.length > 0 ? todos.map((todo) => (
                <TodoItem
                    archived
                    onDelete={(todo) => setSelectedTodo(todo)}
                    key={todo._id}
                    todo={JSON.parse(JSON.stringify(todo))}
                />
            )) : <NoResult />}
        </div>
    );
}
