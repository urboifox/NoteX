import { getTodos } from "@/functions/todos";
import TodosDisplay from "./TodosDisplay";

export default async function TodosContent() {

    const todos = await getTodos();

    return (
        <div className="flex flex-col gap-2">
            <TodosDisplay todos={JSON.parse(JSON.stringify(todos.data))} />
        </div>
    );
}
