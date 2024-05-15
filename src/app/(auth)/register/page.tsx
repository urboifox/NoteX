import { loginAction } from "@/actions/authActions";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Register from "@/components/forms/Register";
import Link from "next/link";

export default function RegisterPage() {

  return (
    <div className="w-full bg-white/10 p-5 rounded-md border border-white/10 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-sm font-light text-white/50">
          Create your account to get started!
        </p>
      </div>

      <Register />

      <div className="flex flex-col gap-2">
        <p className="text-sm font-light text-white/50">
          Already have an account?{" "}
          <Link href={"/login"} className="text-white underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
