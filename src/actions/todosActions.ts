'use server';

import dbConnect from "@/config/db";
import Todo from "@/models/TodoModel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import * as zod from 'zod';
import { decodeJwt, jwtVerify } from "jose";

const createTodoSchema = zod.object({
    title: zod.string().min(2, "Title must be at least 2 characters").max(100, "Title must be at most 100 characters"),
})

type CreateTodoType = {
    success: boolean
    errors?: {
        title?: string[]
    }
}

export async function createTodo(data: CreateTodoType, formData: FormData) {
    const title = formData.get('title') as string;
    const session = cookies().get('session')?.value;
    const tag = formData.get('tag') as string;

    if (!session) {
        redirect('/login');
    }

    const valid = jwtVerify(session, new TextEncoder().encode(process.env.JWT_SECRET!));
    
    if (!valid) {
        return {
            success: false,
        };
    }

    const result = createTodoSchema.safeParse({ title });

    if (result.success) {
        const decoded = decodeJwt(session);
        const userId = decoded?.id;

        await dbConnect();
        const todo = new Todo({ title, creatorId: userId, tag: JSON.parse(tag) });
        await todo.save();
        revalidatePath('/todos');
        return { success: true };
    } else {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors
        }
    }
}