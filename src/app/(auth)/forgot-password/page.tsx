import ForgotPasswordEmail from "@/components/forms/ForgotPasswordEmail";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className="w-full bg-white/10 p-5 rounded-md border border-white/10 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Reset Your password</h1>
        <p className="text-sm font-light text-white/50">We will help you get it back!</p>
      </div>

      <ForgotPasswordEmail />

      <div className="flex flex-col gap-2">
        <p className="text-sm font-light text-white/50">
          <Link href={"/register"} className="text-white underline">
            Login instead
          </Link>
        </p>
      </div>
    </div>
  )
}
