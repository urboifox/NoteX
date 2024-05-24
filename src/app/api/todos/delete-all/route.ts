import dbConnect from "@/config/db";
import Todo from "@/models/TodoModel";
import { decodeJwt, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function DELETE() {
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

    const decoded = decodeJwt(session);
    const userId = decoded?.id;
    if (!userId) {
        redirect('/login');
    }

    await dbConnect();
    await Todo.deleteMany({ creatorId: userId, archived: true });

    return NextResponse.json({ data: null }, { status: 200 });
}