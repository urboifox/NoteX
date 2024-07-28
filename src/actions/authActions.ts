'use server';
import dbConnect from "@/config/db";
import User from "@/models/userModel";
import * as zod from "zod";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import * as jose from "jose";

// validation schema
const registerSchema = zod.object({
    username: zod.string().min(3, {
        message: 'Username must be at least 3 characters'
    }),
    password: zod.string().min(8, {
        message: 'Password must be at least 8 characters'
    }),
    email: zod.string().min(1, "Email is required").email({
        message: 'Email is not valid'
    })
})

const loginSchema = zod.object({
    username: zod.string().min(3, {
        message: 'Username must be at least 3 characters'
    }),
    password: zod.string().min(1, "Password is required")
})

const forgotPasswordEmailSchema = zod.object({
    email: zod.string().email({
        message: 'Username must be at least 3 characters'
    }),
})

const resetPasswordSchema = zod.object({
    newPassword: zod.string().min(1, "Password is required"),
    passwordVerification: zod.string()
}).refine(
        (data) => {
            if (!data.newPassword) {
                return true;
            }
            return data.newPassword.length >= 8;
        },
        {
            message: "New password must be at least 8 characters",
            path: ["newPassword"],
        }
    )
    .refine((data) => data.newPassword === data.passwordVerification, {
        message: "Passwords don't match",
        path: ["passwordVerification"],
    });

// validation schema
const otpSchema = zod.object({
    otp: zod.string().min(3, {
        message: 'OTP is required'
    }),
})



// register action
type registerActionType = {
    success: boolean,
    errors?: {
        email?: string[],
        username?: string[],
        password?: string[]
    }
}

export async function registerAction(data: registerActionType, formData: FormData): Promise<registerActionType> {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const email = formData.get('email') as string;

    const result = registerSchema.safeParse({ username, password, email });

    if (result?.success) {
        await dbConnect();

        const existEmail = await User.findOne({ email: email });
        const existUsername = await User.findOne({ username: { $regex: username, $options: 'i' } });

        if (existEmail || existUsername) {
            return {
                success: false,
                errors: {
                    email: existEmail ? ['Email already exists'] : undefined,
                    username: existUsername ? ['Username already exists'] : undefined,
                }
            };
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hash
        });

        await user.save();

        return {
            success: true,
        };
    } else {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors
        };
    }
}


// login action
type loginActionType = {
    success: boolean,
    errors?: {
        username?: string[],
        password?: string[]
    }
    error?: string,
    data?: typeof User
}

export async function loginAction(data: loginActionType, formData: FormData): Promise<loginActionType> {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const result = loginSchema.safeParse({ username, password });

    if (result?.success) {
        await dbConnect();

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);

        let user;

        if (isEmail) {
            user = await User.findOne({ email: { $regex: username, $options: 'i' }});
        } else {
            user = await User.findOne({ username: { $regex: username, $options: 'i' }});
        }

        if (!user) {
            return {
                success: false,
                error: 'Credentials are incorrect'
            };
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return {
                success: false,
                error: 'Credentials are incorrect'
            };
        }

        // create token and save it to cookies
        // const session = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        const session = await new jose.SignJWT({ id: user._id })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setExpirationTime('1h')
            .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

        cookies().set('session', session, { path: '/', httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 });

        return {
            success: true,
            data: user
        };
    }

    return {
        success: false,
        errors: result.error.flatten().fieldErrors,
    };
}



// verify otp action
type verifyOtpActionType = {
    success: boolean,
    errors?: {
        otp?: string[]
    }
}

export async function verifyOtpAction(data: { otp: string, email: string }, state: verifyOtpActionType, formData: FormData): Promise<verifyOtpActionType> {
    const otp = formData.get('otp') as string;
    const email = data.email;
    const originalOtp = data.otp;

    const result = otpSchema.safeParse({ otp });

    if (result?.success) {
        
        if (otp !== originalOtp || !originalOtp || !email) {
            return {
                success: false,
                errors: {
                    otp: ['OTP is incorrect']
                }
            };
        }

        await dbConnect();

        await User.findOneAndUpdate({ email }, { emailConfirmed: true });

        return {
            success: true,
        };
    } else {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors
        };
    }
}

// forgot password email action
type ForgotPasswordEmailActionType = {
    success: boolean,
    errors?: {
        email?: string[]
    }
    error?: string,
    data?: string,
}

export async function forgotPasswordEmailAction(data: ForgotPasswordEmailActionType, formData: FormData): Promise<ForgotPasswordEmailActionType> {
    const email = formData.get('email') as string;

    const result = forgotPasswordEmailSchema.safeParse({ email });

    if (!result?.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
        };
    }

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
        return {
            success: false,
            error: 'Email Does Not Exist'
        };
    }

    return {
        success: true,
        data: email
    };
}

// reset password action
type ResetPasswordActionType = {
    success: boolean,
    errors?: {
        newPassword?: string[],
        passwordVerification?: string[]
    }
    error?: string,
    data?: string,
}

export async function ResetPasswordAction(data: ResetPasswordActionType, formData: FormData): Promise<ResetPasswordActionType> {
    const email = formData.get('email') as string;
    const newPassword = formData.get('newPassword') as string;
    const passwordVerification = formData.get('passwordVerification') as string;

    const result = resetPasswordSchema.safeParse({ newPassword, passwordVerification });

    if (!result?.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
        };
    }

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
        return {
            success: false,
            error: 'Email Does Not Exist'
        };
    }

    await User.findOneAndUpdate({ email }, { password: await bcrypt.hash(newPassword, 10) });

    return {
        success: true,
    };
}