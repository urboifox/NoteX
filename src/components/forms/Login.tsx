'use client';
import { loginAction } from "@/actions/authActions";
import { AuthAtom } from "@/recoil/atoms/AuthAtom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useSetRecoilState } from "recoil";
import Button from "../common/Button";
import ErrorDisplay from "../common/ErrorDisplay";
import Input from "../common/Input";
import Link from "next/link";

export default function Login() {
  const [state, formAction] = useFormState(loginAction, { success: false })
  const setAuth = useSetRecoilState(AuthAtom);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      const authData = state.data as unknown as UserResponse;
      setAuth(authData)

      router.push('/')
    }
  }, [state, setAuth, router])

  return (
      <form action={formAction} className="flex flex-col gap-4">
        <Input
          label="Username / Email"
          name="username"
          type="text"
          placeholder="john / john@doe.com"
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
        <Link href={"/forgot-password"} className="text-sm text-[#ddd] transition-colors hover:text-white">Forgot your password?</Link>

        <SubmitButton />
      </form>
  )
}

function SubmitButton() {
  const {pending} = useFormStatus();
  return <Button disabled={pending} type="submit">{pending ? "Loading..." : "Login"}</Button>
}