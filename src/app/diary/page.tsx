import Button from "@/components/common/Button";
import NoResult from "@/components/common/NoResult";
import PaginationArrows from "@/components/common/PaginationArrows";
import SearchInput from "@/components/common/SearchInput";
import DiaryCard from "@/components/diaries/DiaryCard";
import { getDiaries } from "@/functions/diaries";
import icons from "@/lib/icons";
import Link from "next/link";
import { Suspense } from "react";

export default async function DiaryPage({searchParams: { page, q }}: {searchParams: {page: string, q: string}}) {

  const { count, data: diaries } = await getDiaries(parseInt(page), undefined, q);

  return (
    <div className="container flex flex-col page gap-5 justify-between pb-5">

      <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <SearchInput />
        <Link
          href="/diary/create"
        >
            <Button className="p-3">
                {icons.plus}
            </Button>
        </Link>
      </div>

      <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {diaries.length > 0 ? (
          diaries.map((diary, index) => {
            return <DiaryCard key={index} diary={diary} />;
          })
        ) : count === 0 ? (
          <div className="col-span-full w-full flex items-center justify-center flex-col gap-4">
            <p className="text-neutral-400">
              Looks like you haven&apos;t created any articles yet.
            </p>
            <Link href="/diary/create">
              <Button>Create {icons.plus}</Button>
            </Link>
          </div>
        ) : (
          <NoResult />
        )}
      </div>
      </div>


      <div className="flex items-center justify-end">
        <Suspense>
          <PaginationArrows count={count} />
        </Suspense>
      </div>
    </div>
  );
}
