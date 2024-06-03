import { mailTransporter } from "./mailTransporter";

export async function sendOtpEmail(email: string, otp: string) {
    // Send the email
    await mailTransporter.sendMail({
        from: '"NoteX" <noreply.notex@gmail.com>',
        to: email,
        subject: "Your NoteX OTP Code",
        text: `Your OTP code is ${otp}`,
        html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
    });
}