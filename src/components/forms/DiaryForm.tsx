"use client";
import { createDiary, updateDiary } from "@/actions/diaryActions";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import Tiptap from "../common/Tiptap/index";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DiaryForm({ diary }: { diary?: DiaryResponse | null }) {
  const [content, setContent] = useState("");

  const [state, formAction] = useFormState(diary ? updateDiary : createDiary, { success: false });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(`Diary ${!!diary ? "saved" : "created"} successfully`);
      router.push('/diary' + (diary ? `/${diary._id}` : ""))
    }
  }, [state.success, router, diary])

  useEffect(() => {
    if (diary) {
      setContent(diary.content);
    }
  }, [diary])

  return (
    <form
      action={(FormData: FormData) => {
        FormData.append("content", content);
        if (diary) {
            FormData.append("diaryId", diary._id);
        }
        formAction(FormData);
      }}
      className="flex flex-col gap-4"
    >
      <Input
        name="brief"
        placeholder="Today I..."
        label="Brief"
        error={state.errors?.brief}
        defaultValue={diary?.brief}
      />

      <Tiptap
        content={content}
        onChange={(newContent) => setContent(newContent)}
        label="Content"
      />

      <SubmitButton edit={!!diary} />
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
