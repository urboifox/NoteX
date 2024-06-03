import Otp from "@/components/forms/Otp";
import dbConnect from "@/config/db";
import { sendOtpEmail } from "@/lib/sendOtpEmail";
import User from "@/models/userModel";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OtpPage({ searchParams: { email } }: { searchParams: { email: string } }) {

    const otp = Array(6).fill(0).map(() => Math.floor(Math.random() * 10)).join('');

    if (email) {
        await dbConnect();
        const user = await User.findOne({ email });
        
        if (!user || user.emailConfirmed) {
            redirect('/');
        }
        
        await sendOtpEmail(email, otp);
    } else {
        redirect('/register');
    }

    return (
        <div className="w-full bg-white/10 p-5 rounded-md border border-white/10 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Verify Your Email</h1>
                <p className="text-sm font-light text-white/50">
                    Enter the OTP sent to your email.
                </p>
            </div>

            <Otp email={email} otp={otp} />

            <div className="flex flex-col gap-2">
                <p className="text-sm font-light text-white/50">
                    Didn&apos;t recieve an email?{" "}
                    <Link href={"/register"} className="text-white underline">
                        Resend
                    </Link>
                </p>
            </div>
        </div>
    );
}
