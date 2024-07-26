import dbConnect from "@/config/db";
import Todo from "@/models/TodoModel";
import { decodeJwt, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getTodos(): Promise<DataResponse<TodoResponse[]>> {
    const session = cookies().get('session')?.value;
    
    if (!session) {
        redirect('/login');
    }
    
    const validSession = jwtVerify(session, new TextEncoder().encode(process.env.JWT_SECRET!));

    if (!validSession) {
        return {
            data: [],
            count: 0,
            status: 401
        }
    }
    
    const decoded = decodeJwt(session);
    const userId = decoded?.id;

    await dbConnect();
    const count = await Todo.countDocuments({ creatorId: userId, archived: false });
    const todos = await Todo.find({ creatorId: userId, archived: false })

    return {
        data: todos,
        count: count,
        status: 200
    };
}

export async function getArchivedTodos(page: number = 1): Promise<DataResponse<TodoResponse[]>> {
    const session = cookies().get('session')?.value;
    
    if (!session) {
        redirect('/login');
    }
    
    const decoded = decodeJwt(session);
    const userId = decoded?.id;

    await dbConnect();
    const count = await Todo.countDocuments({ creatorId: userId, archived: true });
    const todos = await Todo.find({ creatorId: userId, archived: true }).limit(12).skip(12 * (page - 1));

    return {
        data: todos,
        count,
        status: 200
    };
}