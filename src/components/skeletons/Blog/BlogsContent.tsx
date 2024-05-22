import BlogCard from "@/components/blogs/BlogCard";
import PaginationArrows from "@/components/common/PaginationArrows";
import { Suspense } from "react";

export default function BlogLoading() {
  return (
      <div className="flex-1 flex flex-col justify-between gap-3">
          <div className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {Array(9)
                  .fill(0)
                  .map((_, index) => {
                      return (
                          <BlogCard key={index} blog={{} as BlogResponse} />
                      );
                  })}
          </div>

          <div className="flex items-center justify-end">
              <Suspense>
                  <PaginationArrows count={0} />
              </Suspense>
          </div>
      </div>
  );
}