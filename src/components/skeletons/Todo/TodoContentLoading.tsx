import Button from "@/components/common/Button";
import Radio from "@/components/common/Radio";
import Tooltip from "@/components/common/Tooltip";
import TodoItem from "@/components/todos/TodoItem";
import icons from "@/lib/icons";
import Link from "next/link";

export default function TodoContentLoading() {
  return (
      <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-3 mb-3">
              <Tooltip title="Archive">
                  <Link href="/todos/archive">
                      <Button className="text-2xl">{icons.archive}</Button>
                  </Link>
              </Tooltip>
              <Radio value={"all"} defaultChecked label="All" name="filter" />
              <Radio value={"completed"} label="Completed" name="filter" />
              <Radio value={"todo"} label="Todo" name="filter" />
          </div>
          {Array(5)
              .fill({} as TodoResponse)
              .map((todo, i) => (
                  <TodoItem todo={todo} key={i} />
              ))}
      </div>
  );
}
