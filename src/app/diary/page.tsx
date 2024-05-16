import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import PaginationArrows from "@/components/common/PaginationArrows";
import DiaryCard from "@/components/diaries/DiaryCard";
import icons from "@/lib/icons";
import Link from "next/link";
import { Suspense } from "react";

const diary = {
    _id: 1,
    brief: "Diary 1 description amdoawmoia odiaw mwoa mawod oid ma",
    createdAt: new Date(),
}

const diaries = Array(12).fill(diary);

export default async function DiaryPage() {
  return (
    <div className="container pb-5 mt-5 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <Input
          icon={icons.search}
          placeholder="Search..."
        />
        <Link
          href="/diary/create"
        >
            <Button className="p-3">
                {icons.plus}
            </Button>
        </Link>
      </div>

      <div className="gap-4 grid min-h-96 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {diaries.length > 0 ? (
          diaries.map((diary, index) => {
            return <DiaryCard key={index} diary={diary} />;
          })
        ) : (
          <div className="col-span-full flex items-center justify-center flex-col gap-4">
            <p className="text-neutral-400">
              Looks like you haven&apos;t created any articles yet.
            </p>
            <Link href="create">
              <Button>Create {icons.plus}</Button>
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end">
        <Suspense>
          <PaginationArrows />
        </Suspense>
      </div>
    </div>
  );
}
