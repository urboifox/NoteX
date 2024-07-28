import ResetPassword from "@/components/forms/resetPassword";
import dbConnect from "@/config/db";
import User from "@/models/userModel";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewPasswordPage({ searchParams: { token } }: { searchParams: { token: string } }) {
    let email;
    if (token) {
        await dbConnect();
        const user = await User.findOne({ resetPasswordToken: token });

        if (!user) {
            redirect('/register');
        }

        if (user.resetPasswordExpires < Date.now()) {
            redirect('/register');
        }

        email = user.email;
    } else {
        redirect('/register');
    }

    return (
        <div className="w-full bg-white/10 p-5 rounded-md border border-white/10 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Enter New Password</h1>
                <p className="text-sm font-light text-white/50">
                    Make sure to enter a strong password!
                </p>
            </div>

            <ResetPassword email={email} />

            <div className="flex flex-col gap-2">
                <Link className="text-sm text-white underline" href={'/login'}>Login instead</Link>
            </div>
        </div>
    );
}
