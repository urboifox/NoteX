import BlogActions from "@/components/blogs/BlogActions";
import Button from "@/components/common/Button";
import icons from "@/lib/icons";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

export default function OneBlogLoading() {
  return (
      <div className="container flex flex-col gap-5">
          <Link href="/blog">
              <Button>{icons.angleLeft} Back</Button>
          </Link>
          <div className="flex items-end justify-between">
              <Skeleton width={300} height={30} />
              <BlogActions creatorId={""} blogId={""} />
          </div>
          <Skeleton height={300} />
      </div>
  );
}
