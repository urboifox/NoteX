import Login from "@/components/forms/Login";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full bg-white/10 p-5 rounded-md border border-white/10 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-sm font-light text-white/50">Welcome back!</p>
      </div>

      <Login />

      <div className="flex flex-col gap-2">
        <p className="text-sm font-light text-white/50">
          Don&apos;t have an account?{" "}
          <Link href={"/register"} className="text-white underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
