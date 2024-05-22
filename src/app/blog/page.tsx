import BlogsContent from "@/components/blogs/BlogsContent";
import Button from "@/components/common/Button";
import SearchInput from "@/components/common/SearchInput";
import BlogLoading from "@/components/skeletons/Blog/BlogsContent";
import icons from "@/lib/icons";
import Link from "next/link";
import { Suspense } from "react";

export default async function BlogPage({searchParams: { page, q }}: {searchParams: {page: string, q: string}}) {
  return (
      <div className="container flex flex-col page gap-5 justify-between pb-5">
          <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                  <Link href="/">
                      <Button>{icons.angleLeft} Back</Button>
                  </Link>

                  <SearchInput />
              </div>
              <Link href="/blog/create">
                  <Button className="p-3">{icons.plus}</Button>
              </Link>
          </div>

        <Suspense fallback={<BlogLoading />}>
            <BlogsContent page={page} q={q} />
        </Suspense>
      </div>
  );
}
