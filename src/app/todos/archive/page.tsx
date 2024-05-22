import Button from "@/components/common/Button";
import PaginationArrows from "@/components/common/PaginationArrows";
import ArchivedTodosContent from "@/components/todos/ArchivedTodosContent";
import DeleteAllTodosButton from "@/components/todos/DeleteAllTodosButton";
import { getArchivedTodos } from "@/functions/todos";
import icons from "@/lib/icons";
import Link from "next/link";

export default async function TodosArchivePage({searchParams: {page}}: {searchParams: {page: string}}) {

    const archivedTodos = await getArchivedTodos(+page);

    return (
        <div className="pb-5 justify-between container page flex flex-col gap-5">
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-5">
                    <Link className="select-none w-max" href="/todos">
                        <Button>{icons.angleLeft} Back</Button>
                    </Link>

                    <DeleteAllTodosButton todosCount={archivedTodos.count} />
                </div>

                <ArchivedTodosContent todos={JSON.parse(JSON.stringify(archivedTodos.data))} />
            </div>

            <PaginationArrows count={archivedTodos.count} />
        </div>
    );
}
