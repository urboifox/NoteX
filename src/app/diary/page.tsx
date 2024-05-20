import Button from "@/components/common/Button";
import SearchInput from "@/components/common/SearchInput";
import DiariesContent from "@/components/diaries/DiariesContent";
import DiaryLoading from "@/components/skeletons/Diary/DiariesContent";
import icons from "@/lib/icons";
import Link from "next/link";
import { Suspense } from "react";

export default async function DiaryPage({searchParams: { page, q }}: {searchParams: {page: string, q: string}}) {
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

        <Suspense fallback={<DiaryLoading />}>
            <DiariesContent page={page} q={q} />
        </Suspense>
      </div>
  );
}
