"use client";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../common/Modal";
import Radio from "../common/Radio";
import TodoItem from "./TodoItem";
import { useRecoilState } from "recoil";
import { TodosAtom } from "@/recoil/atoms/TodosAtom";

export default function TodosDisplay({ todos }: { todos: TodoResponse[] }) {
    const [data, setData] = useRecoilState(TodosAtom);
    const [selectedTodo, setSelectedTodo] = useState<TodoResponse | null>(null);
    const [filterMethod, setFilterMethod] = useState("all");
    const abortControllerMap = useRef<Map<string, AbortController>>(new Map());
    const timeoutMap = useRef<Map<string, NodeJS.Timeout>>(new Map());

    useEffect(() => {
        setData(todos);
    }, [todos, setData]);

    function handleDeleteTodo() {
        setData(data.filter((todo) => todo._id !== selectedTodo?._id));

        fetch(`/api/todos?todoId=${selectedTodo?._id}`, {
            method: "DELETE",
        }).then(() => toast.success(`Todo Deleted`));

        setSelectedTodo(null);
    }

    function handleChangeTodoStatus(todo: TodoResponse) {
        setData(
            data.map((t) =>
                t._id === todo._id ? { ...t, completed: !t.completed } : t
            )
        );

        // Cancel the previous request for this specific todoId if it exists
        if (abortControllerMap.current.has(todo._id)) {
            abortControllerMap.current.get(todo._id)?.abort();
        }

        // Clear the previous timeout for this specific todoId if it exists
        if (timeoutMap.current.has(todo._id)) {
            clearTimeout(timeoutMap.current.get(todo._id)!);
        }

        // Create a new AbortController for the new request
        const newAbortController = new AbortController();
        abortControllerMap.current.set(todo._id, newAbortController);

        const newTimeout = setTimeout(() => {
            fetch(`/api/todos?todoId=${todo._id}`, {
                method: "PATCH",
                body: JSON.stringify({ completed: !todo.completed }),
                signal: newAbortController.signal,
            })
                .catch((error) => {
                    if (error.name === "AbortError") {
                        console.log("Previous request canceled");
                    } else {
                        toast.error("Couldn't update todo");
                        console.error("Fetch error:", error);
                    }
                });
        }, 500)

        timeoutMap.current.set(todo._id, newTimeout);
    }

    const filteredData = data.filter((todo) => {
        if (filterMethod === "todo") {
            return !todo.completed;
        } else if (filterMethod === "completed") {
            return todo.completed;
        } else {
            return true;
        }
    });

    return (
        <>
            <Modal
                onCancel={() => setSelectedTodo(null)}
                visible={!!selectedTodo}
                text={`Delete ${selectedTodo?.title}`}
                onSubmit={handleDeleteTodo}
            />
            <div className="flex flex-wrap gap-3 mb-3">
                <Radio
                    onChange={(e) => setFilterMethod(e.target.value)}
                    value={"all"}
                    defaultChecked
                    label="All"
                    name="filter"
                />
                <Radio
                    onChange={(e) => setFilterMethod(e.target.value)}
                    value={"completed"}
                    label="Completed"
                    name="filter"
                />
                <Radio
                    onChange={(e) => setFilterMethod(e.target.value)}
                    value={"todo"}
                    label="Todo"
                    name="filter"
                />
            </div>
            {filteredData.map((todo, i) => (
                <TodoItem
                    onClick={handleChangeTodoStatus}
                    onDelete={(todo) => setSelectedTodo(todo)}
                    todo={todo}
                    key={i}
                />
            ))}
        </>
    );
}
