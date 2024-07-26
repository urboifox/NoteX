import BlogActions from "@/components/blogs/BlogActions";
import BlogStats from "@/components/blogs/BlogStats";
import Button from "@/components/common/Button";
import { addView, getBlogBySlug } from "@/functions/blogs";
import icons from "@/lib/icons";
import Link from "next/link";

export default async function OneBlogPage({ params: { slug } }: { params: { slug: string } }) {

    const res = await getBlogBySlug(slug);
    const blog = res?.data;
    await addView(blog?._id.toString() as string);

    return blog ? (
        <div className="container flex flex-col gap-5 pb-10">
            <Link className="w-max" href="/blog">
                <Button>{icons.angleLeft} Back</Button>
            </Link>
            <div className="flex items-end justify-between">
                <h1 className="text-2xl font-light">{blog?.title}</h1>
                <div className="flex items-center gap-3">
                    <BlogStats blog={JSON.parse(JSON.stringify(blog))} />
                    <BlogActions
                        blogSlug={blog?.slug}
                        creatorId={JSON.parse(JSON.stringify(blog?.creatorId))}
                        blogId={JSON.parse(
                            JSON.stringify(blog?._id.toString())
                        )}
                    />
                </div>
            </div>
            <p className="text-neutral-400">{blog?.brief}</p>
            <div
                id="fox-blog"
                className="p-5 bg-white/10 rounded-md border border-white/10"
                dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
            />
        </div>
    ) : (
        <div className="container flex-col gap-3 page flex items-center justify-center text-center">
            <h1>The blog you are looking for does not exist, or private.</h1>
            <Link className="w-max" href="/blog">
                <Button>{icons.angleLeft} Back</Button>
            </Link>
        </div>
    );
}
