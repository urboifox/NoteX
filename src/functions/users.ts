import dbConnect from "@/config/db";
import User from "@/models/userModel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwt } from "jose";

export async function getUser(): Promise<UserResponse> {
    dbConnect();

    const session = cookies().get('session')?.value;

    if (!session) {
        redirect('/login');
    }

    const decoded = decodeJwt(session);
    const userId = decoded?.id;

    const user = await User.findOne({
        _id: userId
    });

    return user;
}

