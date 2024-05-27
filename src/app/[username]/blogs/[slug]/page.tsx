import BlogStats from "@/components/blogs/BlogStats";
import Button from "@/components/common/Button";
import dbConnect from "@/config/db"
import icons from "@/lib/icons";
import Blog from "@/models/blogModel";
import User from "@/models/userModel";
import Link from "next/link";

export default async function PublishedBlogPage({ params: { slug, username } }: { params: { slug: string, username: string } }) {

    await dbConnect();
    const user = await User.findOne({ username });
    const blog = await Blog.findOne({ slug, creatorId: user?._id });
    const isOwner = user?._id === blog?.creatorId;

    return blog && (!isOwner ? blog.published : true) ? (
        <div className="page container">
            <div className="container flex flex-col gap-5">
                <Link className="w-max" href="/blog">
                    <Button>{icons.angleLeft} Back</Button>
                </Link>
                <div className="flex items-end justify-between">
                    <h1 className="text-2xl font-light">{blog?.title}</h1>
                    <div className="flex items-center gap-3">
                        <BlogStats blog={JSON.parse(JSON.stringify(blog))} />
                    </div>
                </div>
                <p className="text-neutral-400">{blog?.brief}</p>
                <div
                    id="fox-blog"
                    className="p-5 bg-white/10 rounded-md border border-white/10"
                    dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
                />
            </div>
        </div>
    ) : (
        <div className="page container flex items-center justify-center gap-3 flex-col">
            <h1>The blog you are looking for does not exist, or private.</h1>
            <Link href={"/blog"}>
                <Button>{icons.angleLeft} Back</Button>
            </Link>
        </div>
    );
}
