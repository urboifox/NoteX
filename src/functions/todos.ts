import dbConnect from "@/config/db";
import Todo from "@/models/TodoModel";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getTodos(): Promise<DataResponse<TodoResponse[]>> {
    const session = cookies().get('session')?.value;
    
    if (!session) {
        redirect('/login');
    }
    
    const decoded = decodeJwt(session);
    const userId = decoded?.id;

    await dbConnect();
    const count = await Todo.countDocuments({ creatorId: userId });
    const todos = await Todo.find({ creatorId: userId });

    return {
        data: todos,
        count: count,
        status: 200
    };
}