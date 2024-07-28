"use client";
import { forgotPasswordEmailAction } from "@/actions/authActions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "../common/Button";
import ErrorDisplay from "../common/ErrorDisplay";
import Input from "../common/Input";

export default function ForgotPasswordEmail() {
    const [state, formAction] = useFormState(forgotPasswordEmailAction, { success: false })

    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            const email = state.data as unknown as string;
            router.push('/otp?email=' + email + '&state=1');
        }
    }, [state, router])

    return (
        <form action={formAction} className="flex flex-col gap-4">
            <Input
                label="Email"
                name="email"
                type="text"
                placeholder="john@doe.com"
                error={state.errors?.email}
            />
            <ErrorDisplay error={state?.error} />

            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button disabled={pending} type="submit">{pending ? "Loading..." : "Send OTP"}</Button>
}