import Button from "@/components/common/Button";
import BlogForm from "@/components/forms/BlogForm";
import icons from "@/lib/icons";
import Link from "next/link";

export default async function CreateBlogPage() {
  return (
    <div className="container pb-10">
      <Link className="mb-5 w-max flex" href="/blog">
        <Button>{icons.angleLeft} Back</Button>
      </Link>

      <BlogForm />
    </div>
  );
}