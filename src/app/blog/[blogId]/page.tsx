import BlogActions from "@/components/blogs/BlogActions";
import Button from "@/components/common/Button";
import { getBlogById } from "@/functions/blogs";
import icons from "@/lib/icons";
import Link from "next/link";

export default async function OneBlogPage({ params: { blogId } }: { params: { blogId: string } }) {

  const blog = await getBlogById(blogId);

  return blog ? (
      <div className="container flex flex-col gap-5">
          <Link href="/blog">
              <Button>{icons.angleLeft} Back</Button>
          </Link>
          <div className="flex items-end justify-between">
              <h1 className="text-2xl font-light text-neutral-500">
                  {blog?.brief}
              </h1>
              <BlogActions blogId={JSON.parse(JSON.stringify(blogId))} />
          </div>
          <div
              className="p-5 bg-white/10 rounded-md border border-white/10"
              dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
          />
      </div>
  ) : (
      <div className="container">
          <h1>404</h1>
      </div>
  );
}