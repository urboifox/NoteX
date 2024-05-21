import Todo from "@/models/TodoModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;
    const todoId = searchParams.get("todoId");

    if (!todoId) {
        return NextResponse.json({ data: null }, { status: 400 });
    }

    await Todo.findByIdAndDelete(todoId);

    return NextResponse.json({ data: null }, { status: 200 });
}