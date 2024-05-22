import React, { Suspense } from "react";
import Link from "next/link";
import Button from "../common/Button";
import icons from "@/lib/icons";
import NoResult from "../common/NoResult";
import PaginationArrows from "../common/PaginationArrows";
import BlogCard from "./BlogCard";
import { getBlogs } from "@/functions/blogs";

export default async function BlogsContent({
    page,
    q,
}: {
    page: string;
    q: string;
}) {
    const { count, data: blogs } = await getBlogs(
        parseInt(page),
        undefined,
        q
    );

    return (
        <div className="flex-1 flex flex-col justify-between gap-3">
            <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {blogs.length > 0 ? (
                    blogs.map((blog, index) => {
                        return <BlogCard key={index} blog={blog} />;
                    })
                ) : count === 0 ? (
                    <div className="col-span-full w-full flex items-center justify-center flex-col gap-4">
                        <p className="select-none text-neutral-400">
                            Looks like you haven&apos;t created any blogs yet.
                        </p>
                        <Link href="/blog/create">
                            <Button>Create {icons.plus}</Button>
                        </Link>
                    </div>
                ) : (
                    <NoResult />
                )}
            </div>

            <div className="flex items-center">
                <Suspense>
                    <PaginationArrows count={count} />
                </Suspense>
            </div>
        </div>
    );
}
