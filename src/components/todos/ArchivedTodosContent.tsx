"use client";
import { useState } from "react";
import Modal from "../common/Modal";
import TodoItem from "./TodoItem";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import NoResult from "../common/NoResult";
import Button from "../common/Button";
import icons from "@/lib/icons";

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

    function handleReturnTodo(todoId: string) {
        fetch(`/api/todos?todoId=${todoId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ archived: false, completed: false }),
        }).then(() => {
            toast.success(`Todo Returned`);
            router.refresh();
        })
    }

    return (
        <div className="flex flex-col gap-3">
            <Modal
                onCancel={() => setSelectedTodo(null)}
                visible={!!selectedTodo}
                text={`Delete ${selectedTodo?.title}`}
                onSubmit={handleDeleteTodo}
            />
            {todos.length > 0 ? todos.map((todo, i) => (
                <div className="flex items-center gap-3" key={i}>
                    <Button onClick={() => handleReturnTodo(todo._id)}>
                        {icons.return}
                    </Button>
                    <TodoItem
                        archived
                        onDelete={(todo) => setSelectedTodo(todo)}
                        todo={JSON.parse(JSON.stringify(todo))}
                    />
                </div>
            )) : <NoResult />}
        </div>
    );
}
