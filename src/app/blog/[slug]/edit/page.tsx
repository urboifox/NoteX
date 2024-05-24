import Button from "@/components/common/Button";
import BlogForm from "@/components/forms/BlogForm";
import { getBlogBySlug } from "@/functions/blogs";
import icons from "@/lib/icons";
import Link from "next/link";

export default async function EditBlogPage({params: {slug}}: {params: {slug: string}}) {

    const blog = await getBlogBySlug(slug);

    return (
        <div className="container pb-10">
            <Link className="mb-5 w-max flex" href={`/blog/${slug}`}>
                <Button>{icons.angleLeft} Back</Button>
            </Link>

            <BlogForm blog={blog?.data} />
        </div>
    );
}
