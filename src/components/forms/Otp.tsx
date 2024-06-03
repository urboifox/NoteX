'use client';
import { verifyOtpAction } from "@/actions/authActions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "../common/Button";
import Input from "../common/Input";
import toast from "react-hot-toast";

export default function Otp({ otp, email }: { otp: string, email: string }) {
  const [state, formAction] = useFormState(verifyOtpAction.bind(null, { otp, email }), { success: false  })
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success('Email verified successfully');
      router.push('/');
    }
  }, [state, router])

  return (
      <form action={formAction} className="flex flex-col gap-4">
        <Input
          label="OTP"
          name="otp"
          maxLength={6}
          placeholder="123456"
          error={state.errors?.otp}
        />

        <SubmitButton />
      </form>
  )
}

function SubmitButton() {
  const {pending} = useFormStatus();
  return <Button disabled={pending} type="submit">{pending ? "Loading..." : "Verify"}</Button>
}