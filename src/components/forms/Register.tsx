'use client';
import { registerAction } from "@/actions/authActions";
import Button from "../common/Button";
import Input from "../common/Input";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function Register() {

  const [state, formAction] = useFormState(registerAction, { success: false });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success('Account created successfully');
      router.push('/login');
    }
  }, [state.success, router])

  return (
      <form action={formAction} className="flex flex-col gap-4">
        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="john"
          error={state.errors?.username}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="john@doe.com"
          error={state.errors?.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          error={state.errors?.password}
        />

        <SubmitButton />

      </form>
 )
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">{pending ? 'Registering...' : 'Register'}</Button>
  )
}

