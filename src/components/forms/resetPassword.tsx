"use client";
import { ResetPasswordAction } from '@/actions/authActions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import Button from '../common/Button';
import Input from '../common/Input';

export default function ResetPassword({ email }: { email: string }) {
    const [state, formAction] = useFormState(ResetPasswordAction, { success: false });
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            toast.success("Password updated successfully");
            router.push("/login");
        }
    }, [state, router]);

    return (
        <form action={formAction} className="flex flex-col gap-5">
            <input type="text" name="email" defaultValue={email} hidden />
            <Input
                label="New Password"
                type="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                name="newPassword"
                error={state?.errors?.newPassword}
            />
            <Input
                label="New Password Confirmation"
                type="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                name="passwordVerification"
                error={state?.errors?.passwordVerification}
            />

            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button disabled={pending} type="submit">
            {pending ? "Saving..." : "Save"}
        </Button>
    );
}
