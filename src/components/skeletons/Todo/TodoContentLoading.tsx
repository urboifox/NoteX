import Radio from "@/components/common/Radio";
import TodoItem from "@/components/todos/TodoItem";

export default function TodoContentLoading() {
  return (
    <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-3 mb-3">
                <Radio
                    value={"all"}
                    defaultChecked
                    label="All"
                    name="filter"
                />
                <Radio
                    value={"completed"}
                    label="Completed"
                    name="filter"
                />
                <Radio
                    value={"todo"}
                    label="Todo"
                    name="filter"
                />
            </div>
            {Array(5).fill({} as TodoResponse).map((todo, i) => (
                <TodoItem
                    todo={todo}
                    key={i}
                />
            ))}
    </div>
  )
}
