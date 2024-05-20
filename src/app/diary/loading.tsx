import Button from "@/components/common/Button";
import PaginationArrows from "@/components/common/PaginationArrows";
import SearchInput from "@/components/common/SearchInput";
import DiaryCard from "@/components/diaries/DiaryCard";
import icons from "@/lib/icons";
import Link from "next/link";
import { Suspense } from "react";

export default function DiaryLoading() {
  return (
      <div className="container flex flex-col page gap-5 justify-between pb-5">
          <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                  <Link href="/">
                      <Button>{icons.arrowLeft} Back</Button>
                  </Link>

                  <SearchInput />
              </div>
              <Link href="/diary/create">
                  <Button className="p-3">{icons.plus}</Button>
              </Link>
          </div>

          <div className="flex-1 flex flex-col justify-between gap-3">
              <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {
                    Array(9).fill(0).map((_, index) => {
                        return (
                            <DiaryCard key={index} diary={{} as DiaryResponse} />
                        )
                    })
                }
              </div>

              <div className="flex items-center justify-end">
                  <Suspense>
                      <PaginationArrows count={0} />
                  </Suspense>
              </div>
          </div>
      </div>
  );
}