'use client';
import { useEffect } from "react";
import Button from "../common/Button";
import ErrorDisplay from "../common/ErrorDisplay";
import Input from "../common/Input";
import { loginAction } from "@/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";
import { useSetRecoilState } from "recoil";
import { AuthAtom } from "@/recoil/atoms/AuthAtom";
import { useRouter } from "next/navigation";

export default function Login() {

  const [state, formAction] = useFormState(loginAction, { success: false })
  const setAuth = useSetRecoilState(AuthAtom);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setAuth(state.data as unknown as UserResponse)
      router.push('/')
    }
  }, [state.success, state.data, setAuth, router])

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
          label="Password"
          name="password"
          type="password"
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          error={state.errors?.password}
        />
        <ErrorDisplay error={state?.error} />

        <SubmitButton />
      </form>
  )
}

function SubmitButton() {
  const {pending} = useFormStatus();
  return <Button disabled={pending} type="submit">{pending ? "Loading..." : "Login"}</Button>
}