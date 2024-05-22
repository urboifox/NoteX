import Button from "@/components/common/Button";
import TodoContentLoading from "@/components/skeletons/Todo/TodoContentLoading";
import TodosAdd from "@/components/todos/TodosAdd";
import TodosContent from "@/components/todos/TodosContent";
import TodosProgress from "@/components/todos/TodosProgress";
import icons from "@/lib/icons";
import Link from "next/link";
import { Suspense } from "react";

export default function TodosPage() {
  return (
      <div className="container page">
          <div className="flex flex-col gap-5">
              <Link href={"/"} className="w-max">
                  <Button>{icons.angleLeft} Back</Button>
              </Link>

              <div className="max-w-full pb-5 w-[500px] mx-auto flex flex-col gap-5">
                  <div className="p-10 gap-5 sm:gap-2 flex flex-col sm:flex-row text-center sm:text-start items-center justify-between transition-colors duration-200 hover:border-white/20 flex-wrap rounded-md border border-white/10">
                      <div className="space-y-2">
                          <h1 className="text-3xl font-bold">Todo Done</h1>
                          <p className="text-neutral-500 tracking-wide text-lg">
                              Keep it up
                          </p>
                      </div>
                      <div className="bg-white text-black rounded-full flex items-center justify-center w-24 sm:w-32 aspect-square font-bold text-2xl sm:text-3xl">
                          <Suspense fallback={"0/0"}>
                              <TodosProgress />
                          </Suspense>
                      </div>
                  </div>

                  <div className="flex flex-col gap-5">
                      <TodosAdd />
                      <Suspense fallback={<TodoContentLoading />}>
                          <TodosContent />
                      </Suspense>
                  </div>
              </div>
          </div>
      </div>
  );
}
