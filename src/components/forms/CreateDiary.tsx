"use client";
import { createDiary } from "@/actions/diaryActions";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import Tiptap from "../common/Tiptap/index";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateDiary() {
  const [content, setContent] = useState("");

  const [state, formAction] = useFormState(createDiary, { success: false });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Diary created successfully");
      router.push('/diary')
    }
  }, [state.success, router])

  return (
    <form
      action={(FormData: FormData) => {
        FormData.append("content", content);
        formAction(FormData);
      }}
      className="flex flex-col gap-4"
    >
      <Input
        name="brief"
        placeholder="Today I..."
        label="Brief"
        error={state.errors?.brief}
      />

      <Tiptap
        content={content}
        onChange={(newContent) => setContent(newContent)}
        label="Content"
      />

      <SubmitButton />
    </form>
  );
}
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? "Loading..." : "Add Diary"}
    </Button>
  );
}
