import Button from "@/components/common/Button";
import ResendButton from "@/components/common/ResendButton";
import Otp from "@/components/forms/Otp";
import dbConnect from "@/config/db";
import { sendOtpEmail } from "@/lib/sendOtpEmail";
import User from "@/models/userModel";
import { redirect } from "next/navigation";
import crypto from "crypto";

export default async function OtpPage({ searchParams: { email, state } }: { searchParams: { email: string, state: string } }) {
    const otp = Array(6).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
    const token = crypto.randomBytes(32).toString('hex');
    const forgetPassword = parseInt(state) === 1;

    if (email) {
        await dbConnect();
        const user = await User.findOne({ email });

        if (!user) {
            redirect('/register');
        }

        if (user.emailConfirmed && !forgetPassword) {
            redirect('/');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;

        await user.save();
        await sendOtpEmail(email, otp);
    } else {
        redirect('/register');
    }

    const handleResend = async () => {
        "use server"
        await sendOtpEmail(email, otp);
    }

    return (
        <div className="w-full bg-white/10 p-5 rounded-md border border-white/10 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Verify Your Email</h1>
                <p className="text-sm font-light text-white/50">
                    Enter the OTP sent to your email.
                </p>
            </div>

            <Otp email={email} otp={otp} forgetPassword={forgetPassword} token={token} />

            <div className="flex flex-col gap-2">
                <p className="text-sm font-light text-white/50">
                    Didn&apos;t recieve an email?{" "}
                    <ResendButton handleResend={handleResend} />
                </p>
            </div>
        </div>
    );
}
