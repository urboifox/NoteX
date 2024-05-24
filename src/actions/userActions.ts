'use server';

import dbConnect from "@/config/db";
import User from "@/models/userModel";
import { compare, hash } from "bcrypt";
import { decodeJwt, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as zod from "zod";

const updateUserSchema = zod
    .object({
        username: zod.string().min(3, {
            message: "Username must be at least 3 characters",
        }),
        email: zod.string().min(1, "Email is required").email({
            message: "Email is not valid",
        }),
        password: zod.string().min(1, "Password is required"),
        newPassword: zod.string().optional(),
        passwordVerification: zod.string().optional(),
    })
    .refine(
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

type UserActionResponse = {
    success: boolean,
    message?: string,
    errors?: {
        username?: string,
        email?: string,
        password?: string,
        newPassword?: string,
        passwordVerification?: string,
    }
}

export async function updateUser(data: UserActionResponse, formData: FormData): Promise<UserActionResponse> {

    const payload = {
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        newPassword: formData.get('newPassword') as string,
        passwordVerification: formData.get('passwordVerification') as string,
        islamic: !!formData.get('islamic'),
        islamicAzan: !!formData.get('islamicAzan'),
        islamicAzkar: !!formData.get('islamicAzkar'),
    };

    const result = updateUserSchema.safeParse(payload);

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors as UserActionResponse['errors'],
        };
    }

    const session = cookies().get('session')?.value;

    if (!session) {
        redirect('/login');
    }

    const validSession = jwtVerify(session, new TextEncoder().encode(process.env.JWT_SECRET!));
    
    if (!validSession) {
        return {
            success: false,
        };
    }

    await dbConnect();

    const decoded = decodeJwt(session);
    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!user) {
        return {
            success: false,
            message: 'User not found',
        };
    }

    const valid = await compare(payload.password, user.password);

    if (!valid) {
        return {
            success: false,
            errors: { password: "Invalid password" },
        };
    }

    if (payload.newPassword) {
        user.password = await hash(payload.newPassword, 10);
    }

    user.username = payload.username;
    user.email = payload.email;
    user.islamic = payload.islamic;
    user.islamicAzan = payload.islamicAzan;
    user.islamicAzkar = payload.islamicAzkar;
    await user.save();

    return {
        success: true,
    };
}