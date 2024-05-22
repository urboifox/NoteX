import Button from "@/components/common/Button";
import PaginationArrows from "@/components/common/PaginationArrows";
import ArchivedTodosContent from "@/components/todos/ArchivedTodosContent";
import DeleteAllTodosButton from "@/components/todos/DeleteAllTodosButton";
import icons from "@/lib/icons";
import Link from "next/link";

export default function TodosArchiveLoadingPage() {
  return (
        <div className="container page flex flex-col gap-5">
            <div className="flex items-center justify-between gap-5">
                <Link className="select-none w-max" href="/todos">
                    <Button>{icons.angleLeft} Back</Button>
                </Link>

                <DeleteAllTodosButton todosCount={0} />
            </div>

            <ArchivedTodosContent todos={Array(7).fill({})} />

            <PaginationArrows count={0} />
        </div>
  )
}
