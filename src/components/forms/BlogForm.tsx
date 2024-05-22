"use client";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import Tiptap from "../common/Tiptap/index";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createBlog, updateBlog } from "@/actions/BlogActions";

export default function BlogForm({ blog }: { blog?: BlogResponse | null }) {
  const [content, setContent] = useState("");

  const [state, formAction] = useFormState(blog ? updateBlog : createBlog, { success: false });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(`Blog ${!!blog ? "saved" : "created"} successfully`);
      router.push('/Blog' + (blog ? `/${blog._id}` : ""))
    }
  }, [state.success, router, blog])

  useEffect(() => {
    if (blog) {
      setContent(blog.content);
    }
  }, [blog])

  return (
    <form
      action={(FormData: FormData) => {
        FormData.append("content", content);
        if (blog) {
            FormData.append("blogId", blog._id);
        }
        formAction(FormData);
      }}
      className="flex flex-col gap-4"
    >
      <Input
        name="brief"
        placeholder="This blog is about..."
        label="Brief"
        error={state.errors?.brief}
        defaultValue={blog?.brief}
      />

      <Tiptap
        content={content}
        onChange={(newContent) => setContent(newContent)}
        label="Content"
      />

      <SubmitButton edit={!!blog} />
    </form>
  );
}
function SubmitButton({edit}: {edit: boolean}) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? "Saving..." : (edit ? "Save" : "Add")}
    </Button>
  );
}
