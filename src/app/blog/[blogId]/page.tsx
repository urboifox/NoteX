import BlogActions from "@/components/blogs/BlogActions";
import BlogStats from "@/components/blogs/BlogStats";
import Button from "@/components/common/Button";
import { addView, getBlogById } from "@/functions/blogs";
import icons from "@/lib/icons";
import Link from "next/link";

export default async function OneBlogPage({ params: { blogId } }: { params: { blogId: string } }) {

    await addView(blogId);
    const res = await getBlogById(blogId);
    const blog = res?.data;

    return blog ? (
        <div className="container flex flex-col gap-5">
            <Link className="w-max" href="/blog">
                <Button>{icons.angleLeft} Back</Button>
            </Link>
            <div className="flex items-end justify-between">
                <h1 className="text-2xl font-light">{blog?.title}</h1>
                <div className="flex items-center gap-3">
                    <BlogStats blog={JSON.parse(JSON.stringify(blog))} />
                    <BlogActions
                        creatorId={JSON.parse(JSON.stringify(blog?.creatorId))}
                        blogId={JSON.parse(JSON.stringify(blogId))}
                    />
                </div>
            </div>
            <p className="text-neutral-400">{blog?.brief}</p>
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