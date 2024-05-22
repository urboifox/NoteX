import Button from "@/components/common/Button";
import BlogForm from "@/components/forms/BlogForm";
import { getBlogById } from "@/functions/blogs";
import icons from "@/lib/icons";
import Link from "next/link";

export default async function EditBlogPage({params: {blogId}}: {params: {blogId: string}}) {

    const blog = await getBlogById(blogId);

    return (
        <div className="container pb-10">
            <Link className="mb-5 w-max flex" href={`/blog/${blogId}`}>
                <Button>{icons.angleLeft} Back</Button>
            </Link>

            <BlogForm blog={blog} />
        </div>
    );
}
