'use client';
import { createDiary } from "@/actions/diaryActions";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Tiptap from "@/components/common/Tiptap/index";
import icons from "@/lib/icons";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function CreateArticlePage({params: {articleId}}: {params: {articleId: string}}) {

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({} as {title: string, description: string});

  return (
    <div className="container pb-10">
      <Link className="mb-5 w-max flex" href="/diary">
        <Button>{icons.angleLeft} Back to diary</Button>
      </Link>
      <form
        action={createDiary}
        className="flex flex-col gap-4"
      >
        <Input
          name="title"
          placeholder="This diary is about..."
          label="Title"
          error={errors.title}
        />

        <Textarea
          name="description"
          placeholder="Brief description..."
          maxLength={150}
          label="Description"
          error={errors.description}
        />

        <Tiptap
          content={content}
          onChange={(newContent) => setContent(newContent)}
          label="Content"
        />

        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type="submit">
      {pending ? "Loading..." : "Add Article"}
    </Button>
  )

}