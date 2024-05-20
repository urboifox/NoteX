import { getDiaries } from "@/functions/diaries";
import React, { Suspense } from "react";
import DiaryCard from "./DiaryCard";
import Link from "next/link";
import Button from "../common/Button";
import icons from "@/lib/icons";
import NoResult from "../common/NoResult";
import PaginationArrows from "../common/PaginationArrows";

export default async function DiariesContent({
    page,
    q,
}: {
    page: string;
    q: string;
}) {
    const { count, data: diaries } = await getDiaries(
        parseInt(page),
        undefined,
        q
    );

    return (
        <div className="flex-1 flex flex-col justify-between gap-3">
            <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {diaries.length > 0 ? (
                    diaries.map((diary, index) => {
                        return <DiaryCard key={index} diary={diary} />;
                    })
                ) : count === 0 ? (
                    <div className="col-span-full w-full flex items-center justify-center flex-col gap-4">
                        <p className="select-none text-neutral-400">
                            Looks like you haven&apos;t created any diaries yet.
                        </p>
                        <Link href="/diary/create">
                            <Button>Create {icons.plus}</Button>
                        </Link>
                    </div>
                ) : (
                    <NoResult />
                )}
            </div>

            <div className="flex items-center justify-end">
                <Suspense>
                    <PaginationArrows count={count} />
                </Suspense>
            </div>
        </div>
    );
}
