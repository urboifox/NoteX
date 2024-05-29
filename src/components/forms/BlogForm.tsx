"use client";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import Tiptap from "../common/Tiptap/index";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createBlog, updateBlog } from "@/actions/BlogActions";
import Radio from "../common/Radio";
import icons from "@/lib/icons";
import TagsInput from "../common/TagsInput";

export default function BlogForm({ blog }: { blog?: BlogResponse | null }) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [state, formAction] = useFormState(blog ? updateBlog : createBlog, { success: false });
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(`Blog ${!!blog ? "saved" : "created"} successfully`);
      router.push('/blog' + (blog ? `/${blog._id}` : ""))
    }
  }, [state?.success, router, blog])

  useEffect(() => {
    if (blog) {
      setContent(blog.content);
      setTags(blog.tags);
    }
  }, [blog])

  return (
    <form
      action={(FormData: FormData) => {
        FormData.append("content", content);
        if (blog) {
            FormData.append("blogId", blog._id);
        }
        tags.forEach((tag) => {
          FormData.append(`tags[]`, tag);
        })
        formAction(FormData);
      }}
      className="flex flex-col gap-4"
    >
      <Input
        name="title"
        placeholder="This blog is about..."
        label="Title"
        error={state.errors?.title}
        defaultValue={blog?.title}
      />

      <Input
        name="brief"
        placeholder="Short description"
        label="Brief"
        error={state.errors?.brief}
        defaultValue={blog?.brief}
      />

      <div className="flex gap-3">
        <Radio
          name="published"
          value={'false'}
          icon={icons.lock}
          label={`Private`}
          defaultChecked={!blog?.published}
        />

        <Radio
          name="published"
          value={'true'}
          label={`Public`}
          icon={icons.globe}
          defaultChecked={blog?.published}
        />
      </div>

      <Tiptap
        content={content}
        onChange={(newContent) => setContent(newContent)}
        label="Content"
      />

      <TagsInput
        label="Tags"
        placeholder="New tag..."
        tags={tags}
        onAddition={(tag) => !tags.includes(tag) && setTags([...tags, tag].filter(t => t.trim() !== ""))}
        onDelete={(tag) => setTags(tags.filter((t) => t !== tag))}
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
